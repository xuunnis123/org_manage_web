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
def getIncomeContributeContext(request,pk):
    incomeContributeContext = IncomeContributeContext.objects.get(_id=pk)
    serializer = IncomeContributeContextSerilizer(incomeContributeContext, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addIncomeContributeContext(request):
    
    data = request.data
    
    if data and len(data) == 0:
        return Response({'detail': 'No Income Contribute Context Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        
        incomeContributeContext = IncomeContributeContext.objects.create(
            context = data['context'],
        )

        serializer = IncomeContributeContextSerilizer(incomeContributeContext, many=False)
        print("serializer:",serializer)
        return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateIncomeContributeContext(request,pk):
    print("updateIncomeContributeContext")
    print("pk=",pk)
    incomeContributeContext = IncomeContributeContext.objects.get(_id=pk)
    if incomeContributeContext:
        data = request.data
        if data.get('context'):
            incomeContributeContext.context = data['context']
    incomeContributeContext.save()
    serializer = IncomeContributeContextSerilizer(incomeContributeContext,many=False)
    
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteIncomeContributeContext(request, pk):
    incomeContributeContextForDeletion = IncomeContributeContext.objects.get(_id=pk)
    incomeContributeContextForDeletion.delete()
    return Response('此收入項目已刪除')

@api_view(['GET'])
def getOutcomeContributeContextList(request):
    outcomeContributeContextList = OutcomeContributeContext.objects.all()
    serializer = OutcomeContributeContextSerilizer(outcomeContributeContextList, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getOutcomeContributeContext(request,pk):
    outcomeContributeContext = OutcomeContributeContext.objects.get(_id=pk)
    serializer = OutcomeContributeContextSerilizer(outcomeContributeContext, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOutcomeContributeContext(request):
    
    data = request.data
    
    if data and len(data) == 0:
        return Response({'detail': 'No Outcome Contribute Context Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        
        outcomeContributeContext = OutcomeContributeContext.objects.create(
            context = data['context'],
        )

        serializer = OutcomeContributeContextSerilizer(outcomeContributeContext, many=False)
        print("serializer:",serializer)
        return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOutcomeContributeContext(request,pk):
    outcomeContributeContext = OutcomeContributeContext.objects.get(_id=pk)
    if outcomeContributeContext:
        data = request.data
        if data.get('context'):
            outcomeContributeContext.context = data['context']
    outcomeContributeContext.save()
    serializer = OutcomeContributeContextSerilizer(outcomeContributeContext,many=False)
    
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteOutcomeContributeContext(request, pk):
    outcomeContributeContextForDeletion = OutcomeContributeContext.objects.get(_id=pk)
    outcomeContributeContextForDeletion.delete()
    return Response('此收入項目已刪除')


@api_view(['GET'])
def getIncomeMoneyCategoryList(request):
    incomeMoneyCategoryList = IncomeMoneyCategory.objects.all()
    serializer = IncomeMoneyCategorySerilizer(incomeMoneyCategoryList, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getIncomeMoneyCategory(request,pk):
    incomeMoneyCategory = IncomeMoneyCategory.objects.get(_id=pk)
    serializer = IncomeMoneyCategorySerilizer(incomeMoneyCategory, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addIncomeMoneyCategory(request):
    
    data = request.data
    
    if data and len(data) == 0:
        return Response({'detail': 'No Income Money Category Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        
        incomeMoneyCategory = IncomeMoneyCategory.objects.create(
            name = data['name'],
            detail = data['detail'],
        )

        serializer = IncomeMoneyCategorySerilizer(incomeMoneyCategory, many=False)
        print("serializer:",serializer)
        return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateIncomeMoneyCategory(request,pk):
    incomeMoneyCategory = IncomeMoneyCategory.objects.get(_id=pk)
    if incomeMoneyCategory:
        data = request.data
        if data.get('name'):
            incomeMoneyCategory.name = data['name']
        if data.get('detail'):
            incomeMoneyCategory.detail = data['detail']
    incomeMoneyCategory.save()
    serializer = IncomeMoneyCategorySerilizer(incomeMoneyCategory,many=False)
    
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteIncomeMoneyCategory(request, pk):
    incomeMoneyCategoryForDeletion = IncomeMoneyCategory.objects.get(_id=pk)
    incomeMoneyCategoryForDeletion.delete()
    return Response('此收入單據類型已刪除')



@api_view(['GET'])
def getOutcomeMoneyCategoryList(request):
    outcomeMoneyCategoryList = OutcomeMoneyCategory.objects.all()
    serializer = OutcomeMoneyCategorySerilizer(outcomeMoneyCategoryList, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getOutcomeMoneyCategory(request,pk):
    outcomeMoneyCategory = OutcomeMoneyCategory.objects.get(_id=pk)
    serializer = OutcomeMoneyCategorySerilizer(outcomeMoneyCategory, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOutcomeMoneyCategory(request):
    
    data = request.data
    
    if data and len(data) == 0:
        return Response({'detail': 'No Outcome Money Category Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        
        outcomeMoneyCategory = OutcomeMoneyCategory.objects.create(
            name = data['name'],
            detail = data['detail'],
        )

        serializer = OutcomeMoneyCategorySerilizer(outcomeMoneyCategory, many=False)
        print("serializer:",serializer)
        return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOutcomeMoneyCategory(request,pk):
    outcomeMoneyCategory = OutcomeMoneyCategory.objects.get(_id=pk)
    if outcomeMoneyCategory:
        data = request.data
        if data.get('name'):
            outcomeMoneyCategory.name = data['name']
        if data.get('detail'):
            outcomeMoneyCategory.detail = data['detail']
    outcomeMoneyCategory.save()
    serializer = OutcomeMoneyCategorySerilizer(outcomeMoneyCategory,many=False)
    
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteOutcomeMoneyCategory(request, pk):
    outcomeMoneyCategoryForDeletion = OutcomeMoneyCategory.objects.get(_id=pk)
    outcomeMoneyCategoryForDeletion.delete()
    return Response('此支出單據類型已刪除')