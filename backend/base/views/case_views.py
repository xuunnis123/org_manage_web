
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.models import Case,Student,School,StudentsPhotoLink


from base.serializers import CaseSerializer,StudentsPhotoLinkSerializer

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
    print("--------------")
    print(request)
    data = request.data
    print("data=",data)
    

        
    student = Student.objects.get(id=int(data))
      
    handle_datetime = datetime.today().strftime('%Y-%m-%d')
    year = int(handle_datetime.split('-')[0])-1911
    day = handle_datetime.split('-')[1]+handle_datetime.split('-')[2]

    school = School.objects.get(_id=student.school._id)
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
        '''
        #visit_photo_urls = data['visit_photo_url']
        #visit_photo_list=[]
        for visit_photo in visit_photo_urls:
            visit_photo_list.append(visit_photo)

        applied_form_photo_url=data['applied_form_photo_url']
        visit_form_photo_url=data['visit_form_photo_url']
        '''
        if data['student_id']!='':

            student = Student.objects.get(id=data['student_id'])
        else:student = None
        print("data['case_no']",data['case_no'])
        print("data['student_id']",data['student_id'])
        print("student=",student)
        case = Case.objects.create(
            case_no = data['case_no'],
            student_name = student,

        )

        serializer = CaseSerializer(case, many=False)
        print("serializer:",serializer)
        return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPhotoListbyStudent(request,pk):
    student = Student.objects.get(id=pk)
    
    stu_link = StudentsPhotoLink.objects.filter(student_name=student.id)
    linkList=[]
    for _ in stu_link:
        serializer = StudentsPhotoLinkSerializer(_, many=False)
        linkList.append(serializer.data)
        
    
    return Response(linkList)
    

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteStudentPhoto(request, pk,type):
    studentPhotoForDeletion = StudentsPhotoLink.objects.get(_id=pk,type=type)
    for student_photo in studentPhotoForDeletion:
        student_photo.delete()
    return Response('此照片紀錄已刪除')