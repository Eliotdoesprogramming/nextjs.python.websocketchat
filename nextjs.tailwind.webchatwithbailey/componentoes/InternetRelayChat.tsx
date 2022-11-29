import React, { useEffect } from 'react'
import { w3cwebsocket as ws} from 'websocket'
export const InternetRelayChat = ({user}) => {
  const [webSocketReady, setWebSocketReady] = React.useState(false);
  const [client, setClient] = React.useState(new ws('ws://localhost:8001'));
  const [messages, setMessages] = React.useState(['welcome'])
  const bottomRef = React.useRef(null)
  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected')
      setWebSocketReady(true)
    }
    client.onmessage = (message) => {
        console.log('from server:'+ message.data)
        setMessages([...messages, message.data])
    }
    client.onerror = function (err) {
      console.log(err)
      console.log('Socket encountered error: ', err.message, 'Closing socket');
      setWebSocketReady(false);
      client.close();
    };
    bottomRef.current.scrollIntoView({ behavior: "smooth" })

  }, [client, messages])
  return (
<div className="bg-white p-2">
    <div className="bg-slate-100
        overflow-y-scroll
        p-2
        block
        py-3
        px-5
        h-64
        mb-0
        rounded-t
        text-black"
        id="messageboxer">
        {messages.map((message, index)=>{
            return <p key={'message'+index}>{message}</p>
        })}
        <div className="mb-0"ref={bottomRef} />
    </div>

    <div>
    <input className="bg-slate-200
            hover:bg-white-700 text-black
            py-2 px-4 rounded-l focus:outline-none
            focus:shadow-outline w-5/6"
            type="text" id="message" onKeyDown={
                (e)=>{
                    if(e.key === 'Enter'){
                        client.send(user+': '+e.currentTarget.value)
                        e.currentTarget.value = ''
                    }
                }
            }/>

    <button className="bg-gray-500
            hover:bg-blue-700 text-white font-bold
            py-2 px-4 rounded-r focus:outline-none
            focus:shadow-outline w-1/6"
        type="button"
            onClick={() => {
                let message = document.getElementById('message')
                client.send(user+': '+message.value)
                message.value = ''
            }
            }>
            Send
        </button>
    </div>
</div>
  )
}

