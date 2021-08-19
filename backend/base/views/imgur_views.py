from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.models import InCome, IncomeMoneyCategory, IncomeContributeContext,OutcomeMoneyCategory, OutcomeContributeContext, Member, Student, OutCome

from django.db.models import F, Sum
from base.serializers import IncomeSerializer, OutcomeSerializer

from rest_framework import status

from datetime import datetime
import configparser
import base.config as env
import os
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
from imgurpython import  ImgurClient



@api_view(['POST'])
def upload_image(request):
    
    data = request.data
    
    print(data)
    album = env.IMGUR_ALBUM
    print(data['image'])
    image=data['image']
    print("--")
    print(type(image))
    
    image_path="file.jpg"

    file = data['image']
    filename = default_storage.save(file.name, ContentFile(file.read()))
    print("filename=",filename)
    print("url=",settings.MEDIA_ROOT)

    config = configparser.ConfigParser()
    path = '/'.join((os.path.abspath(__file__).replace('\\', '/')).split('/')[:-1])
    config.read(os.path.join(path, 'auth.ini'))
    #config.read('auth.ini')
    
    client_id = config['credentials']['client_id']
    client_secret = config['credentials']['client_secret']
    refresh_token = config['credentials']['refresh_token']
    access_token = config['credentials']['access_token']
    client = ImgurClient(client_id,client_secret, refresh_token)
    client.set_user_auth(access_token, refresh_token)   

    if client:
        config={
            'album':album,
            'name':'Ezra',
            'title':'Test',
            'description': 'Test {0}'.format(datetime.now())
        }

        print("Uploading image")
        
        image = client.upload_from_path(settings.MEDIA_ROOT+'/'+filename,config=config,anon=False)
        
        print(image['link'])
        print("Done")
        default_storage.delete(filename)
        return Response(image['link'])

    else:return "Error"