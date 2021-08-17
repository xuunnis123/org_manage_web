import configparser
from imgurpython import ImgurClient

config = configparser.ConfigParser()
config.read('auth.ini')
client_id = config['credentials']['client_id']
client_secret = config['credentials']['client_secret']

client = ImgurClient(client_id,client_secret)

# Extracts the items on the front page of imgur
#items = client.gallery()
#for item in items:

#    print(item.link)
#    print(item.title)
#    print(item.views)


# Find the image on the front page that has the highest number od views
items = client.gallery()
max_item = None
max_views = 0 
for item in items:
    if item.views > max_views:
        max_item = item
        max_views = item.views
print(max_item.title)
print(max_views)