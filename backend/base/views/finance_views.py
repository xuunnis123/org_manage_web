from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.models import InCome


from base.serializers import IncomeSerializer

from rest_framework import status



@api_view(['GET'])
def getIncomeList(request):
    incomes = InCome.objects.all()
    serializer = IncomeSerializer(incomes, many=True)
    return Response(serializer.data)