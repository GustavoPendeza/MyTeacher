from django.shortcuts import get_object_or_404
from rest_framework.views import APIView, Response
from teacher.models import Lesson, Teacher
from teacher.serializers import LessonSerializer, StoreLessonSerializer, TeacherSerializer
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST


class TeacherApiView(APIView):
    def get(self, request, format=None):
        teachers = Teacher.objects.all()
        serializer = TeacherSerializer(teachers, many=True)
        return Response(serializer.data, status=HTTP_200_OK)


class StoreLessonApiView(APIView):
    def post(self, request, id, format=None):
        teacher = get_object_or_404(Teacher, id=id)
        serializer = StoreLessonSerializer(data=request.data)
        if serializer.is_valid():
            lesson = Lesson(
                name=serializer.validated_data.get('name'),
                email=serializer.validated_data.get('email'),
                teacher=teacher
            )
            lesson.save()
            lesson_serializer = LessonSerializer(lesson, many=False)
            return Response(lesson_serializer.data, status=HTTP_201_CREATED)
        return Response(
            {"message": "Erro de validação", "errors": serializer.errors}, 
            status=HTTP_400_BAD_REQUEST
        )
