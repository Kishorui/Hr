from rest_framework import serializers
from .models import Employee, Attendance

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

class AttendanceSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.full_name', read_only=True)

    class Meta:
        model = Attendance
        fields = '__all__'

    def validate(self, data):
        if Attendance.objects.filter(employee=data['employee'], date=data['date']).exists():
            raise serializers.ValidationError("Attendance already marked for this date")
        return data
