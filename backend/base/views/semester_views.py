from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.models import Semester

from django.db.models import F, Sum
from base.serializers import SemesterSerializer

from rest_framework import status

@api_view(['GET'])
def getSemesterList(request):
    semesters = Semester.objects.all()
    serializer = SemesterSerializer(semesters, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getSemester(request,pk):
    
    semester = Semester.objects.get(_id=pk)
    serializer = SemesterSerializer(semester, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addSemester(request):
    
    data = request.data
    print("data First=",data)
    if data and len(data) == 0:
        return Response({'detail': 'No Semester Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        

        semester = Semester.objects.create(

        name = data['name'],
        year = data['year'],
        start_date = data['start_date'],
        end_date = data['end_date'],
        
        )
        serializer = SemesterSerializer(semester, many=False)
        print("serializer:",serializer)
        return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateSemester(request, pk):
    
    
    print("pk:",pk)
    semester = Semester.objects.get(_id=pk)
    print("!!income=",semester)
    if semester:
        data = request.data
        print("data=",data)
    
        

        if data and len(data) != 0:
                
                if data.get('name'):
                    semester.name = data['name']

                if data.get('year'):
                    semester.year = data['year']
                
                if data.get('start_date'):
                    semester.start_date = data['start_date']

                if data.get('end_date'):
                    semester.end_date = data['end_date']
    
           
        semester.save()
        
        serializer = SemesterSerializer(semester, many=False)

        return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteSemester(request, pk):
    semesterForDeletion = Semester.objects.get(_id=pk)
    semesterForDeletion.delete()
    return Response('此筆學期資訊已刪除')