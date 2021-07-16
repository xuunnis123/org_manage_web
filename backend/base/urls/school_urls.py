from django.urls import path
from base.views import school_views as views


urlpatterns =[
  
    path('schools/', views.getSchools, name="get_school_list"),
    path('<str:pk>', views.getSchool, name="get_school"),
    path('create/', views.addSchool, name="add_school"),
    path('update/<str:pk>', views.updateSchool, name="update_school"),
    path('delete/<str:pk>', views.deleteSchool, name="delete_school"),
]