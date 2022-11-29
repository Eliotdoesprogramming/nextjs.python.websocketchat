from django.contrib.auth import get_user_model
import django
import os
import websockets
import asyncio
os.environ['DJANGO_SETTINGS_MODULE'] = 'chat.settings'
django.setup()

User = get_user_model()
user = User.objects.get(username="sa")
from sesame.utils import get_token
token = get_token(user)

async def send_token():
    async with websockets.connect('ws://localhost:8888') as websocket:
        await websocket.send(token)
        print(await websocket.recv())

asyncio.run(send_token())
