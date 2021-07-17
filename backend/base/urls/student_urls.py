from django.urls import path
from base.views import student_views as views


urlpatterns =[
  
    path('students/', views.getStudentsList, name="get_student_list"),
    path('<str:pk>', views.getStudent, name="get_student"),
    path('create/', views.addStudent, name="add_student"),
    path('update/<str:pk>', views.updateStudent, name="update_student"),
    path('delete/<str:pk>', views.deleteStudent, name="delete_student"),
]