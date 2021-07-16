from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.models import School


from base.serializers import SchoolSerializer

from rest_framework import status

@api_view(['GET'])
def getSchools(request):
    schools = School.objects.all()
    serializer = SchoolSerializer(schools, many=True)
    
    return Response(serializer.data)



@api_view(['GET'])
def getSchool(request,pk):
    school = School.objects.get(_id=pk)
    serializer = SchoolSerializer(school, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addSchool(request):
    
    data = request.data
    
    if data and len(data) == 0:
        return Response({'detail': 'No School Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        # (1) Create order
        
        school = School.objects.create(
            name = data.get('name'),
            represent_person_name = data['represent_person_name'],
            represent_person_phone = data['represent_person_phone'],
            memo = data['memo']
           
        )

        serializer = SchoolSerializer(school, many=False)
        print("serializer:",serializer)
        return Response(serializer.data)




@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateSchool(request, pk):
    school = School.objects.get(_id=pk)
    print(school)
    if school:
        data = request.data
        print(data)
        
        if data and len(data) != 0:
                if data.get('name'):
                    school.name = data['name']
                if data.get('represent_person_name'):
                    school.represent_person_name = data['represent_person_name']
                if data.get('represent_person_phone'):
                    school.represent_person_phone = data['represent_person_phone']
                if data.get('memo'):
                    school.memo = data['memo']
    
        school.save()
        
        serializer = SchoolSerializer(school, many=False)

        return Response(serializer.data)
    

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteSchool(request, pk):
    schoolForDeletion = School.objects.get(_id=pk)
    schoolForDeletion.delete()
    return Response('學校已刪除')


    

