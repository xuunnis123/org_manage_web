from django.urls import path
from base.views import finance_views as views


urlpatterns =[
  
    path('incomeList/', views.getIncomeList, name="get_income_list"),
    
]