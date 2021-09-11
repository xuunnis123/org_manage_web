from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.models import InCome, IncomeMoneyCategory, IncomeContributeContext,OutcomeMoneyCategory, OutcomeContributeContext, Member, Student, OutCome

from django.db.models import F, Sum
from base.serializers import IncomeSerializer, OutcomeSerializer

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
        return Response({'detail': 'No Income Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        print("data=",data)
        if data['category']!='':
            category = IncomeMoneyCategory.objects.get(_id=data['category'])
        else:
            category = None

        if data['title']!='':
            title = IncomeContributeContext.objects.get(_id=data['title'])
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

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateIncome(request, pk):
    
    
    print("pk:",pk)
    income = InCome.objects.get(_id=pk)
    print("!!income=",income)
    if income:
        data = request.data
        print("data=",data)
    
        

        if data and len(data) != 0:
                
                if data.get('subject'):
                    income.subject = data['subject']

                if data.get('detail'):
                    income.detail = data['detail']
                
                if data.get('income_money'):
                    income.income_money = data['income_money']

                if data.get('unit'):
                    income.unit = data['unit']

                
                
               
                
                if data.get('category'):
                    if data['category']!='':
                        if isinstance(data['category'], int):
                            category = IncomeMoneyCategory.objects.get(_id=data['category'])
                            
                        else:
                            category = IncomeMoneyCategory.objects.get(_id=data['category'])
                    else:
                        category = None
                
                    income.category = category

                
                if data.get('title'):
                    
                    if data['title']!='':    
                        if isinstance(data['title'], int):
                            
                            title = IncomeContributeContext.objects.get(_id=data['title'])
                            
                        else:
                            
                            title = IncomeContributeContext.objects.get(_id=data['title'])
                    else:
                        
                        title = None

                    income.title = title

                if data.get('from_whom'):
                    
                    if data['from_whom']!='':    
                        if isinstance(data['from_whom'], int):
                            
                            from_whom = Member.objects.get(_id=data['from_whom'])
                            
                        else:
                            
                            from_whom = Member.objects.get(_id=data['from_whom'])
                    else:
                        
                        from_whom = None

                    income.from_whom = from_whom

                if data.get('confirmed_person'):
                    
                    if data['confirmed_person']!='':    
                        if isinstance(data['confirmed_person'], int):
                            
                            confirmed_person = Member.objects.get(_id=data['confirmed_person'])
                            
                        else:
                            
                            confirmed_person = Member.objects.get(_id=data['confirmed_person'])
                    else:
                        
                        confirmed_person = None

                    income.confirmed_person = confirmed_person

                
                
           
        income.save()
        
        serializer = IncomeSerializer(income, many=False)

        return Response(serializer.data)
    

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteIncome(request, pk):
    incomeForDeletion = InCome.objects.get(_id=pk)
    incomeForDeletion.delete()
    return Response('此筆收入已刪除')





@api_view(['GET'])
def getOutcomeList(request):
    outcomes = OutCome.objects.all()
    serializer = OutcomeSerializer(outcomes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getOutcome(request,pk):
    try:
        outcome = OutCome.objects.get(_id=pk)
    except OutCome.DoesNotExist:
        outcome = None
    serializer = OutcomeSerializer(outcome, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOutcome(request):
    
    data = request.data
    print("data First=",data)
    if data and len(data) == 0:
        return Response({'detail': 'No Outcome Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        print("data=",data)
        if data['category']!='':
            category = OutcomeMoneyCategory.objects.get(_id=data['category'])
        else:
            category = None

        if data['title']!='':
            title = OutcomeContributeContext.objects.get(_id=data['title'])
        else:
            title = None
        
        if data['to_whom']!='':
            to_whom = Student.objects.get(id=data['to_whom'])
        else:
            to_whom = None

        if data['confirmed_person']!='':
            confirmed_person = Member.objects.get(_id=data['confirmed_person'])
        else:
            confirmed_person = None

       
        print("category=",category)
        print("title=",title)
        print("to_whom=",to_whom)
        print("confirmed_person=",confirmed_person)
        outcome = OutCome.objects.create(

            category=category,
            subject = data['subject'],
            title = title, 
            to_whom=to_whom,
            detail = data['detail'], 
            outcome_money = data['outcome_money'],
            unit = data['unit'],
            confirmed_person = confirmed_person,

        )
        serializer = OutcomeSerializer(outcome, many=False)
        print("serializer:",serializer)
        return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOutcome(request, pk):
    
    
    print("pk:",pk)
    outcome = OutCome.objects.get(_id=pk)
    print("!!outcome=",outcome)
    if outcome:
        data = request.data
        print("data=",data)
    
        

        if data and len(data) != 0:
                
                if data.get('subject'):
                    outcome.subject = data['subject']

                if data.get('detail'):
                    outcome.detail = data['detail']
                
                if data.get('outcome_money'):
                    outcome.outcome_money = data['outcome_money']

                if data.get('unit'):
                    outcome.unit = data['unit']

                
                
               
                
                if data.get('category'):
                    if data['category']!='':
                        if isinstance(data['category'], int):
                            category = OutcomeMoneyCategory.objects.get(_id=data['category'])
                            
                        else:
                            category = OutcomeMoneyCategory.objects.get(_id=data['category'])
                    else:
                        category = None
                
                    outcome.category = category

                
                if data.get('title'):
                    
                    if data['title']!='':    
                        if isinstance(data['title'], int):
                            
                            title = OutcomeContributeContext.objects.get(_id=data['title'])
                            
                        else:
                            
                            title = OutcomeContributeContext.objects.get(_id=data['title'])
                    else:
                        
                        title = None

                    outcome.title = title

                if data.get('to_whom'):
                    
                    if data['to_whom']!='':    
                        if isinstance(data['to_whom'], int):
                            
                            to_whom = Student.objects.get(id=data['to_whom'])
                            
                        else:
                            
                            to_whom = Student.objects.get(id=data['to_whom'])
                    else:
                        
                        to_whom = None

                    outcome.to_whom = to_whom

                if data.get('confirmed_person'):
                    
                    if data['confirmed_person']!='':    
                        if isinstance(data['confirmed_person'], int):
                            
                            confirmed_person = Member.objects.get(_id=data['confirmed_person'])
                            
                        else:
                            
                            confirmed_person = Member.objects.get(_id=data['confirmed_person'])
                    else:
                        
                        confirmed_person = None

                    outcome.confirmed_person = confirmed_person

                
                
           
        outcome.save()
        
        serializer = OutcomeSerializer(outcome, many=False)

        return Response(serializer.data)
    

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteOutcome(request, pk):
    outcomeForDeletion = OutCome.objects.get(_id=pk)
    outcomeForDeletion.delete()
    return Response('此筆支出已刪除')

@api_view(['GET'])
def sumOutComeRequest(request):
    
    outcomes = OutCome.objects.all()
    
    outcomeSerializer = OutcomeSerializer(outcomes, many=True)
    totalOutcome = 0

    #InCome.objects.annotate(the_sum=Sum(F('income__in') - F('billinfo__concession')))
    
    for outcome in outcomeSerializer.data:
        totalOutcome += outcome.get('outcome_money')
        print(outcome.get('title'))
        print(outcome.get('_id'))
        print(outcome.get('outcome_money'))
        print("-----")
    print("Outcome total=",totalOutcome)
    
    return Response(str(totalOutcome))

@api_view(['GET'])
def sumInComeRequest(request):
    incomes = InCome.objects.all()
    incomeSerializer = IncomeSerializer(incomes, many=True)
    totalIncome = 0

    #InCome.objects.annotate(the_sum=Sum(F('income__in') - F('billinfo__concession')))
    
    for income in incomeSerializer.data:
        totalIncome += income.get('income_money')
        print(income.get('title'))
        print(income.get('_id'))
        print(income.get('income_money'))
        print("-----")
    print("Income total=",totalIncome)
    
    return Response(str(totalIncome))

def sumOutCome():
    
    outcomes = OutCome.objects.all()
    
    outcomeSerializer = OutcomeSerializer(outcomes, many=True)
    totalOutcome = 0

    #InCome.objects.annotate(the_sum=Sum(F('income__in') - F('billinfo__concession')))
    
    for outcome in outcomeSerializer.data:
        totalOutcome += outcome.get('outcome_money')
        print(outcome.get('title'))
        print(outcome.get('_id'))
        print(outcome.get('outcome_money'))
        print("-----")
    print("Outcome total=",totalOutcome)
    
    return totalOutcome


def sumInCome():
    incomes = InCome.objects.all()
    incomeSerializer = IncomeSerializer(incomes, many=True)
    totalIncome = 0

    #InCome.objects.annotate(the_sum=Sum(F('income__in') - F('billinfo__concession')))
    
    for income in incomeSerializer.data:
        totalIncome += income.get('income_money')
        print(income.get('title'))
        print(income.get('_id'))
        print(income.get('income_money'))
        print("-----")
    print("Income total=",totalIncome)
    
    return totalIncome

@api_view(['GET'])
def calculateAllMoney(request):
    total = 0
    total = sumInCome()-sumOutCome()
   
   
    print("total=",total)
   
    return Response(str(total))

