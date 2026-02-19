from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from .models import Employee, Attendance
from .serializers import EmployeeSerializer, AttendanceSerializer


def get_user_role(request):
    if hasattr(request.user, "profile"):
        return request.user.profile.role
    return "Employee"


# LIST + CREATE EMPLOYEES (ADMIN + HR)
class EmployeeListCreateView(generics.ListCreateAPIView):
    queryset = Employee.objects.all().order_by('-id')
    serializer_class = EmployeeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        role = get_user_role(self.request)

        # Employee cannot add users
        if role == "Employee":
            raise PermissionDenied("You have no permission to Add user")

        # Admin & HR allowed
        serializer.save()


# DELETE EMPLOYEE (ONLY ADMIN)
class EmployeeDeleteView(generics.DestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    lookup_field = 'id'
    permission_classes = [permissions.IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        role = get_user_role(request)

        if role == "HR":
            raise PermissionDenied("You have no permissions to delete user")

        if role == "Employee":
            raise PermissionDenied("You have no permission to Delete user")

        # Only Admin allowed
        return super().destroy(request, *args, **kwargs)


# CREATE ATTENDANCE (ADMIN + HR)
class AttendanceCreateView(generics.CreateAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        role = get_user_role(self.request)

        if role == "Employee":
            raise PermissionDenied("You have no permission to mark attendance")

        serializer.save()


# LIST ALL ATTENDANCE (ROLE BASED)
class AttendanceListView(generics.ListAPIView):
    serializer_class = AttendanceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        role = get_user_role(self.request)

        # Admin & HR → see all
        if role in ["Admin", "HR"]:
            return Attendance.objects.select_related('employee').all().order_by('-date')

        # Employee → only own attendance
        return Attendance.objects.select_related('employee').filter(
            employee__email=self.request.user.email
        ).order_by('-date')


# FILTER ATTENDANCE BY EMPLOYEE (ADMIN + HR)
class EmployeeAttendanceView(generics.ListAPIView):
    serializer_class = AttendanceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        role = get_user_role(self.request)

        if role not in ["Admin", "HR"]:
            raise PermissionDenied("You have no permission to view other employees attendance")

        employee_id = self.kwargs['employee_id']
        queryset = Attendance.objects.filter(employee_id=employee_id).order_by('-date')

        date = self.request.query_params.get('date')
        if date:
            queryset = queryset.filter(date=date)

        return queryset
