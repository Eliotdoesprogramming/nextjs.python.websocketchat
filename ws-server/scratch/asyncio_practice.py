import asyncio

async def main():
    task = asyncio.create_task(fun2())
    await asyncio.sleep(1)
    print("Hello")
    await task
async def fun2():
    print("world")
asyncio.run(main())
