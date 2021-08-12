from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.models import Scholorship, Student, Semester

 
from base.serializers import ScholorshipSerializer,StudentSerializer,SemesterSerializer

from rest_framework import status

@api_view(['GET'])
def getScholorshipList(request):
    scholorships = Scholorship.objects.all()
    serializer = ScholorshipSerializer(scholorships, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getScholorship(request,pk):
    scholorship = Scholorship.objects.get(_id=pk)
    serializer = ScholorshipSerializer(scholorship, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addScholorship(request):
    
    data = request.data
    #TODO add Outcome 
    if data and len(data) == 0:
        return Response({'detail': 'No Scholorship Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

      
        if data['name']!='':

            studentName = Student.objects.get(id=data['name'])
        else:studentName = None

        if data['semester']!='':

            semesterName = Semester.objects.get(_id=data['semester'])
        else:
            semesterName = None
        scholorship = Scholorship.objects.create(
            name = studentName,
            price = data['price'],
            semester = semesterName,
        )

        serializer = ScholorshipSerializer(scholorship, many=False)
        print("serializer:",serializer)
        return Response(serializer.data)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateScholorship(request, pk):
    #TODO add Outcome
    
    print("pk:",pk)
    scholorship = Scholorship.objects.get(_id=pk)
    if scholorship:
        data = request.data
        
        if data and len(data) != 0:
                
                if data.get('price'):
                    scholorship.price = data['price']

              
                if data.get('name'):
                    if data['name']!='':
                        if isinstance(data['name'], int):
                            studentName = Student.objects.get(id=data['name'])
                            
                        else:
                            studentName = Student.objects.get(id=data['name'])
                    else:
                        studentName = None
                
                    scholorship.name = studentName

                
                if data.get('semester'):
                    
                    if data['semester']!='':    
                        if isinstance(data['semester'], int):
                            
                            semestername = Semester.objects.get(_id=data['semester'])
                            
                        else:
                            
                            semestername = Semester.objects.get(_id=data['semester'])
                    else:
                        
                        semestername = None

                    scholorship.semestername = semestername

           
        scholorship.save()
        
        serializer = ScholorshipSerializer(scholorship, many=False)

        return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteScholorship(request, pk):
    #TODO OUTCOME
    scholorForDeletion = Scholorship.objects.get(_id=pk)
    scholorForDeletion.delete()
    return Response('獎學金已刪除')
