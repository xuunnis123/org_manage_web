from django.urls import path
from base.views import setting_views as views

urlpatterns =[
  
    path('income/contributeContextList', views.getIncomeContributeContextList, name="get_income_contribute_contextList"),
    path('outcome/contributeContextList', views.getOutcomeContributeContextList, name="get_outcome_contribute_contextList"),
    path('income/moneycategoryList', views.getIncomeMoneyCategoryList, name="get_income_money_categoryList"),
    path('outcome/moneycategoryList', views.getOutcomeMoneyCategoryList, name="get_outcome_money_categoryList"),
   
]