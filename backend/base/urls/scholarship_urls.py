from django.urls import path
from base.views import scholarship_views as views


urlpatterns =[
  
    path('scholarshipList/', views.getScholarshipList, name="get_scholarship_list"),
    path('<str:pk>', views.getScholarship, name="get_scholarship"),
    path('create/', views.addScholarship, name="add_scholarship"),
    path('update/<str:pk>', views.updateScholarship, name="update_scholarship"),
    path('delete/<str:pk>', views.deleteScholarship, name="delete_scholarship"),
    
   
]