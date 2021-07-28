from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.models import Member


from base.serializers import MemberSerializer

from rest_framework import status

@api_view(['GET'])
def getMembersList(request):
    members = Member.objects.all()
    serializer = MemberSerializer(members, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def getMember(request,pk):
    member = Member.objects.get(_id=pk)
    serializer = MemberSerializer(member, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addMember(request):
    
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
        member = Member.objects.create(
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

        serializer = MemberSerializer(member, many=False)
        print("serializer:",serializer)
        return Response(serializer.data)




@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateMember(request, pk):
    
    
    print("pk:",pk)
    member = Member.objects.get(_id=pk)
    print("!!member=",member)
    if member:
        data = request.data
        print("data=",data)
    
        

        if data and len(data) != 0:
                
                if data.get('name'):
                    member.name = data['name']

                if data.get('job'):
                    member.job = data['job']
                
                if data.get('phone'):
                    member.phone = data['phone']

                if data.get('address'):
                    member.address = data['address']

                if data.get('title'):
                    member.title = data['title']
                
                member.is_staff = data['is_staff'] == True
               
                member.is_admin = data['is_admin'] == True
                
                if data.get('family'):
                    if data['family']!='':
                        if isinstance(data['family'], int):
                            familyMem = Member.objects.get(_id=data['family'])
                            
                        else:
                            familyMem = Member.objects.get(_id=data['family'])
                    else:
                        familyMem = None
                
                    member.family = familyMem

                
                if data.get('intro_by'):
                    
                    if data['intro_by']!='':    
                        if isinstance(data['intro_by'], int):
                            
                            intro_byMem = Member.objects.get(_id=data['intro_by'])
                            
                        else:
                            
                            intro_byMem = Member.objects.get(_id=data['intro_by'])
                    else:
                        
                        intro_byMem = None

                    member.intro_by = intro_byMem

                if data.get('memo'):
                    member.memo = data['memo']
                
           
        member.save()
        
        serializer = MemberSerializer(member, many=False)

        return Response(serializer.data)
    

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteMember(request, pk):
    memberForDeletion = Member.objects.get(_id=pk)
    memberForDeletion.delete()
    return Response('會員已刪除')