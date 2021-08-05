from django.urls import path
from base.views import setting_views as views

urlpatterns =[
  
    path('income/contributeContextList', views.getIncomeContributeContextList, name="get_income_contribute_contextList"),
    path('income/contributeContext/<str:pk>', views.getIncomeContributeContext, name="get_income_contribute_context"),
    path('income/contributeContext/create/', views.addIncomeContributeContext, name="add_income_contribute_context"),
    path('income/contributeContext/update/<str:pk>', views.updateIncomeContributeContext, name="update_income_contribute_context"),
    path('income/contributeContext/delete/<str:pk>', views.deleteIncomeContributeContext, name="delete_income_contribute_context"),
    
    path('outcome/contributeContextList', views.getOutcomeContributeContextList, name="get_outcome_contribute_contextList"),
    path('outcome/contributeContext/<str:pk>', views.getOutcomeContributeContext, name="get_outcome_contribute_context"),
    path('outcome/contributeContext/create/', views.addOutcomeContributeContext, name="add_outcome_contribute_context"),
    path('outcome/contributeContext/update/<str:pk>', views.updateOutcomeContributeContext, name="update_outcome_contribute_context"),
    path('outcome/contributeContext/delete/<str:pk>', views.deleteOutcomeContributeContext, name="delete_outcome_contribute_context"),
    
    path('income/moneycategoryList', views.getIncomeMoneyCategoryList, name="get_income_money_categoryList"),
    path('income/moneycategory/<str:pk>', views.getIncomeMoneyCategory, name="get_income_moneycategory"),
    path('income/moneycategory/create/', views.addIncomeMoneyCategory, name="add_income_moneycategory"),
    path('income/moneycategory/update/<str:pk>', views.updateIncomeMoneyCategory, name="update_income_moneycategory"),
    path('income/moneycategory/delete/<str:pk>', views.deleteIncomeMoneyCategory, name="delete_income_moneycategory"),
    
    path('outcome/moneycategoryList', views.getOutcomeMoneyCategoryList, name="get_outcome_money_categoryList"),
    path('outcome/moneycategory/<str:pk>', views.getOutcomeMoneyCategory, name="get_outcome_moneycategory"),
    path('outcome/moneycategory/create/', views.addOutcomeMoneyCategory, name="add_outcome_moneycategory"),
    path('outcome/moneycategory/update/<str:pk>', views.updateOutcomeMoneyCategory, name="update_outcome_moneycategory"),
    path('outcome/moneycategory/delete/<str:pk>', views.deleteOutcomeMoneyCategory, name="delete_outcome_moneycategory"),



]