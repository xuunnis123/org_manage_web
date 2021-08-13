from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.models import Scholorship, Student, Semester,OutCome,OutcomeMoneyCategory,OutcomeContributeContext,Member,ScholorshipWithOutcomeRelation

 
from base.serializers import ScholorshipSerializer,StudentSerializer,SemesterSerializer,OutcomeSerializer

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
  
    if data and len(data) == 0:
        return Response({'detail': 'No Scholorship Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        #TODO
        outcomeMoneyId = OutcomeMoneyCategory.objects.get(_id=1) #B-2
        outcomeContributeId = OutcomeContributeContext.objects.get(_id=4) #獎學金
        confrimed_personId = Member.objects.get(_id=4) #李小姐

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
        outcome = OutCome.objects.create(
            category =   outcomeMoneyId,
            title = outcomeContributeId,
            to_whom = studentName,
            detail = str(semesterName)+'| 獎學金:'+ str(studentName),
            outcome_money = data['price'],
            unit = 'NTD',
            confirmed_person = confrimed_personId,

        )
       

        ScholorshipWithOutcomeRelation.objects.create(
            scholorship_id = scholorship._id,
            outcome_id = outcome._id,
            )
        serializer = ScholorshipSerializer(scholorship, many=False)
        serializer2 = OutcomeSerializer(outcome, many=False)
        print("serializer2:",serializer2)

        return Response(serializer.data)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateScholorship(request, pk):
    
    
    scholorship = Scholorship.objects.get(_id=pk)

    scholorshipOutcome= ScholorshipWithOutcomeRelation.objects.get(scholorship_id=pk)
    outcome_id = scholorshipOutcome.outcome_id
    
    outcome = OutCome.objects.get(_id=outcome_id)
    
    if scholorship:
        data = request.data
        
        if data and len(data) != 0:
                
                if data.get('price'):
                    scholorship.price = data['price']
                    outcome.outcome_money = data['price']
              
                if data.get('name'):
                    if data['name']!='':
                        if isinstance(data['name'], int):
                            studentName = Student.objects.get(id=data['name'])
                            
                        else:
                            studentName = Student.objects.get(id=data['name'])
                    else:
                        studentName = None
                
                    scholorship.name = studentName
                    outcome.to_whom = studentName
                    semesterName=scholorship.semester.name
                    
                    outcome.detail = str(semesterName)+'| 獎學金:'+ str(studentName)
                
                if data.get('semester'):
                    
                    if data['semester']!='':    
                        if isinstance(data['semester'], int):
                            
                            semestername = Semester.objects.get(_id=data['semester'])
                            
                        else:
                            
                            semestername = Semester.objects.get(_id=data['semester'])
                    else:
                        
                        semestername = None

                    scholorship.semester = semestername
                    outcome.detail = str(semestername)+'| 獎學金:'+ str(studentName)
           
        scholorship.save()
        outcome.save()
        serializer = ScholorshipSerializer(scholorship, many=False)

        return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteScholorship(request, pk):
    scholorForDeletion = Scholorship.objects.get(_id=pk)
    
    scholorshipOutcome= ScholorshipWithOutcomeRelation.objects.get(scholorship_id=pk)
    outcome_id = scholorshipOutcome.outcome_id
    outcomeForDeletion = OutCome.objects.get(_id=outcome_id)

    scholorForDeletion.delete()
    outcomeForDeletion.delete()
    scholorshipOutcome.delete()
    return Response('獎學金已刪除')
