# from django.shortcuts import render

# # Create your views here.

# from rest_framework import viewsets
# from .models import Student
# from .serializers import StudentSerializer


# class StudentViewSet(viewsets.ModelViewSet):

#     queryset = Student.objects.all()

#     serializer_class = StudentSerializer


#     def student_page(request):
#         return render(request, 'index.html')




from django.shortcuts import render
from rest_framework import viewsets

from .models import Student
from .serializers import StudentSerializer


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


def student_page(request):
    return render(request, 'index.html')