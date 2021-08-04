from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.models import IncomeContributeItem, IncomeMoneyCategory, IncomeContributeContext,OutcomeMoneyCategory, OutcomeContributeContext,OutcomeContributeItem

from django.db.models import F, Sum
from base.serializers import OutcomeMoneyCategorySerilizer, IncomeMoneyCategorySerilizer,IncomeContributeContextSerilizer,OutcomeContributeContextSerilizer

from rest_framework import status

@api_view(['GET'])
def getIncomeContributeContextList(request):
    incomeContributeContextList = IncomeContributeContext.objects.all()
    serializer = IncomeContributeContextSerilizer(incomeContributeContextList, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getOutcomeContributeContextList(request):
    outcomeContributeContextList = OutcomeContributeContext.objects.all()
    serializer = OutcomeContributeContextSerilizer(outcomeContributeContextList, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getIncomeMoneyCategoryList(request):
    incomeMoneyCategoryList = IncomeMoneyCategory.objects.all()
    serializer = IncomeMoneyCategorySerilizer(incomeMoneyCategoryList, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getOutcomeMoneyCategoryList(request):
    outcomeMoneyCategoryList = OutcomeMoneyCategory.objects.all()
    serializer = OutcomeMoneyCategorySerilizer(outcomeMoneyCategoryList, many=True)
    return Response(serializer.data)