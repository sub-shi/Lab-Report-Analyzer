import pytesseract
import cv2
import numpy as np
import re

from PIL import Image
from pdf2image import convert_from_bytes

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser

from .models import LabResult


class UploadReportView(APIView):
    parser_classes = [MultiPartParser]
    permission_classes = [IsAuthenticated]

    def extract_text(self, image):                                     # Convert image to grayscale for better OCR accuracy
        gray = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2GRAY)
        config = r'--oem 3 --psm 6'
        return pytesseract.image_to_string(gray, config=config)

    def parse_text(self, text):                                        # Parse the extracted text to find lab results
        results = []
        lines = text.splitlines()

        for line in lines:
            line = line.strip()
            if not line or not any(char.isdigit() for char in line):
                continue

            match = re.match(r'^([A-Z \-/(),]+)\s+([\d.]+)\s+([a-zA-Z/%μ]+)\s+([\d.\-–]+[\s\-toTO]*[\d.]+)?', line)
            if match:
                parameter = match.group(1).strip()
                value = float(match.group(2))
                unit = match.group(3).strip()
                range_ = match.group(4).strip() if match.group(4) else "-"
                attention = self.flag_attention(value, range_)

                results.append({
                    "parameter": parameter,
                    "value": value,
                    "unit": unit,
                    "range": range_,
                    "attention": attention
                })

        return results

    def flag_attention(self, value, range_):                                    # Check if the value is within the reference range
        try:
            match = re.search(r'(\d+\.?\d*)\s*[-–toTO]+\s*(\d+\.?\d*)', range_)
            if match:
                low = float(match.group(1))
                high = float(match.group(2))
                if value < low or value > high:
                    return "Needs Attention"
        except:
            pass
        return "Normal"
    
    
#Demo data for trends

    def simulate_trends(self):
        return {
            "Hemoglobin": [
                {"date": "2024-12-01", "value": 14.2},
                {"date": "2025-03-01", "value": 13.7},
                {"date": "2025-06-01", "value": 13.9},
            ],
            "WBC Count": [
                {"date": "2024-12-01", "value": 5.2},
                {"date": "2025-03-01", "value": 4.8},
                {"date": "2025-06-01", "value": 4.2},
            ],
            "Blood Glucose": [
                {"date": "2024-12-01", "value": 89},
                {"date": "2025-03-01", "value": 93},
                {"date": "2025-06-01", "value": 95},
            ],
        }

    def post(self, request):                   # Handle file upload and process the lab report
        file = request.data.get('file')
        if not file:
            return Response({"error": "No file uploaded"}, status=400)

        ext = file.name.split('.')[-1].lower()
        try:
            if ext == "pdf":
                images = convert_from_bytes(file.read())
            else:
                images = [Image.open(file).convert('RGB')]
        except Exception as e:
            return Response({"error": f"Error reading file: {e}"}, status=400)

        full_text = "\n".join(self.extract_text(img) for img in images)
        parsed = self.parse_text(full_text)

        for row in parsed:
            LabResult.objects.create(
                user=request.user,
                parameter=row["parameter"],
                value=row["value"],
                unit=row["unit"],
                reference_range=row["range"],
                attention=row["attention"]
            )

        return Response({
            "table": parsed,
            "trends": self.simulate_trends()
        })
