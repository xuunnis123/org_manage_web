from django.urls import path
from base.views import finance_views as views


urlpatterns =[
  
    path('incomeList/', views.getIncomeList, name="get_income_list"),
    path('income/<str:pk>', views.getIncome, name="get_income"),
    path('income/create/', views.addIncome, name="add_income"),
    path('income/update/<str:pk>', views.updateIncome, name="update_income"),
    path('income/delete/<str:pk>', views.deleteIncome, name="delete_income"),
    path('income/sum/', views.sumInComeRequest, name="sumIncome"),
    
    path('outcomeList/', views.getOutcomeList, name="get_outcome_list"),
    path('outcome/<str:pk>', views.getOutcome, name="get_outcome"),
    path('outcome/create/', views.addOutcome, name="add_outcome"),
    path('outcome/update/<str:pk>', views.updateOutcome, name="update_outcome"),
    path('outcome/delete/<str:pk>', views.deleteOutcome, name="delete_outcome"),
    path('outcome/sum/', views.sumOutComeRequest, name="sumOutcome"),

    path('allsum/', views.calculateAllMoney, name="allsum"),
    
]