from django.urls import path
from .views import *

urlpatterns = [
    path('employees/', EmployeeListCreateView.as_view()),
    path('employees/<int:id>/', EmployeeDeleteView.as_view()),
    path('attendance/', AttendanceCreateView.as_view()),        
    path('attendance/all/', AttendanceListView.as_view()),     
    path('attendance/<int:employee_id>/', EmployeeAttendanceView.as_view()),
]
