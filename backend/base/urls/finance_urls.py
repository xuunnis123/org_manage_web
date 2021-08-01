from django.urls import path
from base.views import finance_views as views


urlpatterns =[
  
    path('incomeList/', views.getIncomeList, name="get_income_list"),
    path('income/<str:pk>', views.getIncome, name="get_income"),
    path('income/create/', views.addIncome, name="add_income"),
    path('income/update/<str:pk>', views.updateIncome, name="update_income"),
    path('income/delete/<str:pk>', views.deleteIncome, name="delete_income"),
]