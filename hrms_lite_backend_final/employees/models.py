from django.contrib.auth.models import User
from django.db import models

class UserProfile(models.Model):
    ROLE_CHOICES = (
        ('Admin', 'Admin'),
        ('HR', 'HR'),
        ('Employee', 'Employee'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='Employee')

    def __str__(self):
        return f"{self.user.username} - {self.role}"
    
class Employee(models.Model):
    employee_id = models.CharField(max_length=20, unique=True)
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    department = models.CharField(max_length=100)

    def __str__(self):
        return self.full_name


class Attendance(models.Model):
    STATUS_CHOICES = (
        ('Present', 'Present'),
        ('Absent', 'Absent'),
    )

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='attendances')
    date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)

    class Meta:
        unique_together = ('employee', 'date')
