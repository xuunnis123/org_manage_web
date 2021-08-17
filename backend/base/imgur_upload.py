from auth import authenticate
from datetime import datetime
import configparser
album = None
image_path='p.jpg'
from imgurpython import  ImgurClient

def upload_image(client):
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

if __name__ == '__main__':
    #client = authenticate()
    config = configparser.ConfigParser()
    config.read('auth.ini')
    client_id = config['credentials']['client_id']
    client_secret = config['credentials']['client_secret']
    refresh_token = config['credentials']['refresh_token']
    access_token = config['credentials']['access_token']

    print(client_id)
    print(client_secret)
    #client = ImgurClient(client_id,client_secret)

    client = ImgurClient(client_id,client_secret, refresh_token)
    client.set_user_auth(access_token, refresh_token)       

    print("client=",client)
    upload_image(client)
    print("Image was posted")