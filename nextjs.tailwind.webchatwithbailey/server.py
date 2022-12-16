import asyncio
import websockets
import subprocess
import sys
CLIENTS = set()
async def handler(websocket: websockets.WebSocketServerProtocol):
    CLIENTS.add(websocket)
    while True:
        try:
            message = await websocket.recv()
            if '9kill9kill9' in message:
                exit()
            await websockets.broadcast(CLIENTS, message)
        except websockets.exceptions.ConnectionClosed:
            print("Connection closed")
            CLIENTS.remove(websocket)
            break
        except TypeError:
            pass
async def main():
    async with websockets.serve(handler, "", 8001,origins=[None, '*','http://localhost:3000']):
        await asyncio.Future()  # run forever

def start():
    asyncio.run(main())

if __name__ == "__main__":
    start()
