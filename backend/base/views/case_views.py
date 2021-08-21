from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.models import Case,Student,School


from base.serializers import CaseSerializer

from rest_framework import status
from datetime import datetime
#from ..imgur_upload import setconfig,upload_image 

@api_view(['GET'])
def getCasesList(request):
    cases = Case.objects.all()
    serializer = CaseSerializer(cases, many=True)
    
    return Response(serializer.data)

@api_view(['GET'])
def getCase(request,pk):
    
    case = Case.objects.get(_id=pk)
    serializer = CaseSerializer(case, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def genCaseNo(request):
    
    data = request.data
    
    if data and len(data) == 0:
        return Response({'detail': 'No Student Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        if data['student_name']!='':

            student = Student.objects.get(id=data['student_name'])
        else:student = None

        handle_datetime = datetime.today().strftime('%Y-%m-%d')
        year = int(handle_datetime.split('-')[0])-1911
        day = handle_datetime.split('-')[1]+handle_datetime.split('-')[2]

        school = School.objects.get(_id=student.school)
        memo=school.memo
        case_no = str(year)+str(day)+'案'+str(student.id)+str(memo)+str(student.name)
        
        
       
        return Response(case_no)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addCase(request):
    
    data = request.data
    
    if data and len(data) == 0:
        return Response({'detail': 'No Case Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        visit_photo_urls = data['visit_photo_url']
        visit_photo_list=[]
        for visit_photo in visit_photo_urls:
            visit_photo_list.append(visit_photo)

        applied_form_photo_url=data['applied_form_photo_url']
        visit_form_photo_url=data['visit_form_photo_url']

        if data['student_name']!='':

            student = Student.objects.get(id=data['student_name'])
        else:student = None

        handle_datetime = datetime.today().strftime('%Y-%m-%d')
        year = int(handle_datetime.split('-')[0])-1911
        day = handle_datetime.split('-')[1]+handle_datetime.split('-')[2]
        case_no = str(year)+str(day)+'案'+str(student.id)+str(student.school)+str(student.name)
        
        case = Case.objects.create(
            case_no = case_no,
            student_name = student,
            visit_photo = str(visit_photo_list),
            applied_form_photo = applied_form_photo_url,
            visit_form_photo = visit_form_photo_url,
           

        )

        serializer = CaseSerializer(case, many=False)
        print("serializer:",serializer)
        return Response(serializer.data)