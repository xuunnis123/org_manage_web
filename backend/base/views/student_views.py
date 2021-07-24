from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.models import Student,School


from base.serializers import StudentSerializer

from rest_framework import status

@api_view(['GET'])
def getStudentsList(request):
    students = Student.objects.all()
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def getStudent(request,pk):
    student = Student.objects.get(id=pk)
    print(student)
    serializer = StudentSerializer(student, many=False)
    print(serializer)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addStudent(request):
    
    data = request.data
    
    if data and len(data) == 0:
        return Response({'detail': 'No Student Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        # (1) Create student
        school = School.objects.get(_id=data['school'])
        is_endTrans = data['is_end'] == True
        print("school:",school)
        student = Student.objects.create(
            name = data['name'],
            school = school,
            phone = data['phone'],
            address = data['address'],
            tags = data['tags'],
            is_end = is_endTrans,
            memo = data['memo'],
            file = data['file'],

        )

        serializer = StudentSerializer(student, many=False)
        print("serializer:",serializer)
        return Response(serializer.data)




@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateStudent(request, pk):
    
    
    
    student = Student.objects.get(id=pk)
    
    if student:
        data = request.data
        if isinstance(data['school'], int):
            school = School.objects.get(_id=data['school'])
            
        else:
            school = School.objects.get(name=data['school'])
        
        if data and len(data) != 0:
                if data.get('name'):
                    student.name = data['name']
                
                student.school = school
                if data.get('phone'):
                    student.phone = data['phone']
                if data.get('address'):
                    student.address = data['address']
                if data.get('tags'):
                    student.tags = data['tags']
                
                
                is_endTrans = data['is_end'] == True
                
                student.is_end = is_endTrans
                if data.get('memo'):
                    student.memo = data['memo']
                if data.get('file'):
                    student.file = data['file']
           
        student.save()
        
        serializer = StudentSerializer(student, many=False)

        return Response(serializer.data)
    

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteStudent(request, pk):
    studentForDeletion = Student.objects.get(id=pk)
    studentForDeletion.delete()
    return Response('學校已刪除')