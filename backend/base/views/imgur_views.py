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

from imgurpython import  ImgurClient



@api_view(['POST'])
def upload_image(request):
    data = request.data
    print('request=',request)
    album = env.IMGUR_ALBUM
    print(data['image'])
    print("--")
    print(data)
    image_path=data['image']

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
        image = client.upload_from_path(image_path,config=config,anon=False)
        print(image['link'])
        print("Done")
        return image

    else:return "Error"