from django.urls import path
from base.views import scholorship_views as views


urlpatterns =[
  
    path('scholorshipList/', views.getScholorshipList, name="get_scholorship_list"),
    path('<str:pk>', views.getScholorship, name="get_scholorship"),
    path('create/', views.addScholorship, name="add_scholorship"),
    path('update/<str:pk>', views.updateScholorship, name="update_scholorship"),
    path('delete/<str:pk>', views.deleteScholorship, name="delete_scholorship"),
    
   
]