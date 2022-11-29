from flask import Flask
import time
import multiprocessing as mp
app = Flask(__name__)

def job():
    time.sleep(5)
    print("hi")


@app.route('/')
def trigger_job():
    p = mp.Process(target=job)
    p.start()
    return 'job started'

if __name__ == '__main__':
    app.run()
