import asyncio
import websockets

CLIENTS = set()
async def handler(websocket: websockets.WebSocketServerProtocol):
    CLIENTS.add(websocket)
    print('sockets: ',CLIENTS)
    while True:
        try:
            message = await websocket.recv()
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

if __name__ == "__main__":
    asyncio.run(main())
