from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.models import Scholarship, Student, Semester,OutCome,OutcomeMoneyCategory,OutcomeContributeContext,Member,ScholarshipWithOutcomeRelation

 
from base.serializers import ScholarshipSerializer,StudentSerializer,SemesterSerializer,OutcomeSerializer

from rest_framework import status

@api_view(['GET'])
def getScholarshipList(request):
    scholarships = Scholarship.objects.all()
    serializer = ScholarshipSerializer(scholarships, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getScholarship(request,pk):
    try:
        scholarship = Scholarship.objects.get(_id=pk)
    except Scholarship.DoesNotExist:
        scholarship=None
    serializer = ScholarshipSerializer(scholarship, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addScholarship(request):
    
    data = request.data
  
    if data and len(data) == 0:
        return Response({'detail': 'No Scholarship Items'}, status=status.HTTP_400_BAD_REQUEST)
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

        scholarship = Scholarship.objects.create(
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
       

        ScholarshipWithOutcomeRelation.objects.create(
            scholarship_id = scholarship._id,
            outcome_id = outcome._id,
            )
        serializer = ScholarshipSerializer(scholarship, many=False)
        serializer2 = OutcomeSerializer(outcome, many=False)
        print("serializer2:",serializer2)

        return Response(serializer.data)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateScholarship(request, pk):
    
    
    scholarship = Scholarship.objects.get(_id=pk)

    scholarshipOutcome= ScholarshipWithOutcomeRelation.objects.get(scholarship_id=pk)
    outcome_id = scholarshipOutcome.outcome_id
    
    outcome = OutCome.objects.get(_id=outcome_id)
    
    if scholarship:
        data = request.data
        
        if data and len(data) != 0:
                
                if data.get('price'):
                    scholarship.price = data['price']
                    outcome.outcome_money = data['price']
              
                if data.get('name'):
                    if data['name']!='':
                        if isinstance(data['name'], int):
                            studentName = Student.objects.get(id=data['name'])
                            
                        else:
                            studentName = Student.objects.get(id=data['name'])
                    else:
                        studentName = None
                
                    scholarship.name = studentName
                    outcome.to_whom = studentName
                    semesterName=scholarship.semester.name
                    
                    outcome.detail = str(semesterName)+'| 獎學金:'+ str(studentName)
                
                if data.get('semester'):
                    
                    if data['semester']!='':    
                        if isinstance(data['semester'], int):
                            
                            semestername = Semester.objects.get(_id=data['semester'])
                            
                        else:
                            
                            semestername = Semester.objects.get(_id=data['semester'])
                    else:
                        
                        semestername = None

                    scholarship.semester = semestername
                    outcome.detail = str(semestername)+'| 獎學金:'+ str(studentName)
           
        scholarship.save()
        outcome.save()
        serializer = ScholarshipSerializer(scholarship, many=False)

        return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteScholarship(request, pk):
    scholarForDeletion = Scholarship.objects.get(_id=pk)
    
    scholarshipOutcome= ScholarshipWithOutcomeRelation.objects.get(scholarship_id=pk)
    outcome_id = scholarshipOutcome.outcome_id
    outcomeForDeletion = OutCome.objects.get(_id=outcome_id)

    scholarForDeletion.delete()
    outcomeForDeletion.delete()
    scholarshipOutcome.delete()
    return Response('獎學金已刪除')
