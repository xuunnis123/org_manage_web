from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User


#rom base.serializers import ProductSerializer

from rest_framework import status

@api_view(['GET'])
def getProducts(request):
    #product = Product.objects.all()
    #serializer = ProductSerializer(product, many=True)
    return Response(  )



@api_view(['GET'])
def getProduct(request,pk):
    #product = Product.objects.get(_id=pk)
    #serializer = ProductSerializer(product, many=False)
    return Response()