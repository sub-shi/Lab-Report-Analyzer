from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('admin/', admin.site.urls),          # Admin interface
    path('api/', include('app.urls')),        # Main app URLs
    path('api/login/', obtain_auth_token),    # Token-based authentication
]
