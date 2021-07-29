from django.urls import path
from base.views import case_views as views


urlpatterns =[
    path('cases/', views.getCasesList, name="get_case_list"),
    
    
]