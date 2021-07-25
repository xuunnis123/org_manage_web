from django.urls import path
from base.views import member_views as views


urlpatterns =[
  
    path('members/', views.getMembersList, name="get_member_list"),
    path('<str:pk>', views.getMember, name="get_member"),
    path('create/', views.addMember, name="add_member"),
    path('update/<str:pk>', views.updateMember, name="update_member"),
    path('delete/<str:pk>', views.deleteMember, name="delete_member"),
]