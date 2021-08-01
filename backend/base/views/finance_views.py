from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.models import InCome, MoneyCategory, ContributeContext, Member


from base.serializers import IncomeSerializer

from rest_framework import status



@api_view(['GET'])
def getIncomeList(request):
    incomes = InCome.objects.all()
    serializer = IncomeSerializer(incomes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getIncome(request,pk):
    
    income = InCome.objects.get(_id=pk)
    serializer = IncomeSerializer(income, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addIncome(request):
    
    data = request.data
    print("data First=",data)
    if data and len(data) == 0:
        return Response({'detail': 'No Member Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        print("data=",data)
        if data['category']!='':
            category = MoneyCategory.objects.get(_id=data['category'])
        else:
            category = None

        if data['title']!='':
            title = ContributeContext.objects.get(_id=data['title'])
        else:
            title = None
        
        if data['from_whom']!='':
            from_whom = Member.objects.get(_id=data['from_whom'])
        else:
            from_whom = None

        if data['confirmed_person']!='':
            confirmed_person = Member.objects.get(_id=data['confirmed_person'])
        else:
            confirmed_person = None

       
        print("category=",category)
        print("title=",title)
        print("from_whom=",from_whom)
        print("confirmed_person=",confirmed_person)
        income = InCome.objects.create(

            category=category,
            subject = data['subject'],
            title = title, 
            from_whom=from_whom,
            detail = data['detail'], 
            income_money = data['income_money'],
            unit = data['unit'],
            confirmed_person = confirmed_person,

        )
        serializer = IncomeSerializer(income, many=False)
        print("serializer:",serializer)
        return Response(serializer.data)