from django.urls import path
from base.views import semester_views as views


urlpatterns =[
  
    path('semesterList/', views.getSemesterList, name="get_semester_list"),
    path('<str:pk>', views.getSemester, name="get_semester"),
    path('create/', views.addSemester, name="add_semester"),
    path('update/<str:pk>', views.updateSemester, name="update_semester"),
    path('delete/<str:pk>', views.deleteSemester, name="delete_semester"),
    
   
]