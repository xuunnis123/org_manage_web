from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.models import Case,Student


from base.serializers import CaseSerializer

from rest_framework import status

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
def addCase(request):
    
    data = request.data
    
    if data and len(data) == 0:
        return Response({'detail': 'No Case Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        client = ''
        visit_photo_url=''
        applied_form_photo_url=''
        visit_form_photo_url=''

        if data['student_name']!='':

            student = Student.objects.get(id=data['student_name'])
        else:student = None

        member = Case.objects.create(
            case_no = data['case_no'],
            student_name = student,
            visit_photo = visit_photo_url,
            applied_form_photo = applied_form_photo_url,
            visit_form_photo = visit_form_photo_url,
           

        )

        serializer = CaseSerializer(member, many=False)
        print("serializer:",serializer)
        return Response(serializer.data)