from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import UserProfile


class SignupView(APIView):
    permission_classes = []  # Public signup

    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")
        role = request.data.get("role") or "Employee"

        if not username or not email or not password:
            return Response(
                {"error": "All fields are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(email=email).exists():
            return Response(
                {"error": "Email already registered"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create user
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        # Create profile with role
        UserProfile.objects.create(user=user, role=role)

        return Response(
            {"message": "Signup successful", "role": role},
            status=status.HTTP_201_CREATED
        )


class LoginView(APIView):
    permission_classes = []  # Public login

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            user_obj = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"error": "Invalid Email or Password"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        user = authenticate(username=user_obj.username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            role = user.profile.role if hasattr(user, "profile") else "Employee"

            return Response({
                "access": str(refresh.access_token),
                "username": user.username,
                "email": user.email,
                "role": role,
                "message": "Login successful"
            })

        return Response(
            {"error": "Invalid Email or Password"},
            status=status.HTTP_401_UNAUTHORIZED
        )
