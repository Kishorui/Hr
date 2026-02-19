from django.contrib import admin
from django.urls import path, include
from employees.auth_views import SignupView, LoginView

urlpatterns = [
    path('admin/', admin.site.urls),

    # AUTH APIs
    path('api/signup/', SignupView.as_view()),
    path('api/login/', LoginView.as_view()),

    # HRMS APIs
    path('api/', include('employees.urls')),
]
