import { useContext, useEffect, useState } from "react"
import { WebSocketContext } from "../context/WebSocketContext"
import InputControl from "./InputControl"
import { useSelector } from "react-redux"
import { AiOutlineSend } from 'react-icons/ai'

const StreamChat = ({ id }) => {
    const { user } = useSelector(state => state.user)

    const [messageText, setMessageText] = useState('')
    const [chat, setChat] = useState([])

    const socket = useContext(WebSocketContext)

    useEffect(() => {
        socket.emit('join-stream', { id })
        socket.on('on-message', ({ msg, username }) => {
            setChat(chat.concat([{ msg, username }]))
        })

        socket.on('joined-stream', ({ msg }) => {
          //setWelcomeModel(msg)
        })
    }, [chat])

    const sendMessage = () => {
        socket.emit('message', {
            id,
            message: messageText,
            username: user.username
        })
    }

    return (
        <div className="pb-4 ml-4 rounded h-auto w-[25%] bg-[#3C096C4D]">
            <main className="flex flex-col justify-between min-h-[100%] max-h-[100%] px-3">
                <div className="h-full max-h-[800px] overflow-auto py-[14px]">
                {
                    chat.map((msg, id) => (
                        <div key={id} className="break-words">        
                            <span className="font-semibold text-purple-600">{ msg.username }: </span>
                            <span className="text-accent">{ msg.msg }</span>
                        </div>
                    ))
                }
                </div>
                <div className="flex justify-between items-center bg-[#3C096CCC] rounded-[10px]">
                    <div className="w-full mr-2">
                        <InputControl placeholder="Message text" onChange={setMessageText} disable={user? true : false} />
                    </div>
                    <AiOutlineSend onClick={() => sendMessage()} className="text-purple-600 font-semibold text-3xl" />
                </div>
            </main>
        </div>
    )
}

export default StreamChat