from django.urls import path
from base.views import case_views as views


urlpatterns =[
    path('cases/', views.getCasesList, name="get_case_list"),
    path('<str:pk>', views.getCase, name="get_member"),
    path('create/', views.addCase, name="add_case"),
    path('gencaseno/', views.genCaseNo, name="generate_case_no"),
    
    path('getphotoList/<str:pk>', views.getPhotoListbyStudent, name="get_photo_list_by_student"),
    path('delete/<str:type>/<str:pk>', views.deleteStudentPhoto, name="delete_student_photo"),
]