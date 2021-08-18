from django.urls import path
from base.views import imgur_views as views


urlpatterns =[
path('upload/', views.upload_image, name="upload_image"),
]