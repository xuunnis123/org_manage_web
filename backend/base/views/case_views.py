from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.models import Case


from base.serializers import CaseSerializer

from rest_framework import status



@api_view(['GET'])
def getCasesList(request):
    cases = Case.objects.all()
    serializer = CaseSerializer(cases, many=True)
    print("test===",serializer.data[0].get('student').get('school'))
    return Response(serializer.data)

@api_view(['GET'])
def getCase(request,pk):
    
    case = Case.objects.get(_id=pk)
    serializer = CaseSerializer(case, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addCase(request):
    
    data = request.data
    
    if data and len(data) == 0:
        return Response({'detail': 'No Member Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        # (1) Create member
        
        #is_endTrans = data['is_end'] == True
        print("data==",data)
        
        is_staffTrans = data['is_staff'] == 'True'
        
        is_adminTrans = data['is_admin'] == 'True'
        
        if data['family']!='':

            familyMem = Member.objects.get(_id=data['family'])
        else:familyMem = None

        if data['intro_by']!='':

            intro_byMem = Member.objects.get(_id=data['intro_by'])
        else:
            intro_byMem = None
        member = Case.objects.create(
            name = data['name'],
            job = data['job'],
            phone = data['phone'],
            address = data['address'],
            title = data['title'],
            is_staff = is_staffTrans,
            is_admin =  is_adminTrans,
            family = familyMem,
            intro_by = intro_byMem,
            memo = data['memo'],

        )

        serializer = CaseSerializer(member, many=False)
        print("serializer:",serializer)
        return Response(serializer.data)