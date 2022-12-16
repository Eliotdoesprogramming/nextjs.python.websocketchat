import React from 'react'
import { w3cwebsocket as ws} from 'websocket'

import { InternetRelayChat } from '../componentoes/InternetRelayChat'
const Home = () => {
  const [isUser, setIsUser] = React.useState(false)
  const [user, setUser] = React.useState('')
  return (
    <div className="min-h-full">
      <div className="bg-white p-2">
        {
          isUser ? <InternetRelayChat user={user} /> : (
            <div className="bg-slate-400
              py-10
              rounded
              justify-center
            ">
    <input className="bg-slate-200
            hover:bg-white-700 text-black
            py-2 px-4 rounded-l focus:outline-none
            focus:shadow-outline w-5/6"
            placeholder='Enter your name'
            type="text" id="message" onKeyDown={
                (e)=>{
                    if(e.key === 'Enter'){
                        setUser(e.currentTarget.value)
                        setIsUser(true)
                    }
                }
            }/>

    <button className="bg-gray-500
            hover:bg-blue-700 text-white font-bold
            py-2 px-4 rounded-r focus:outline-none
            focus:shadow-outline w-1/6"
        type="button"
            onClick={() => {
                setUser(document.getElementById('message').value)
                setIsUser(true)
            }
            }>
            Submit
        </button>
            </div>
            )
        }
      </div>
    </div>
  )
}
export default Home
