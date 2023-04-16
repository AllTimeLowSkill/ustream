import { useEffect, useState } from "react"
import ReactPlayer from "react-player/file"
import { socket } from "../context/WebSocketContext"
import Button from "./Button"
import { useDispatch, useSelector } from "react-redux"
import { addFollow } from "../store/slices/userSlice"

const Stream = ({ streamKey, avatar, username, id }) => {
    const { user } = useSelector(state => state.user)
    const { categories } = useSelector(state => state.category)
    const dispatch = useDispatch()

    const [viewersCount, setViewersCount] = useState(0)
    const [categoryName, setCategory] = useState(null)

    useEffect(() => {
        const category = categories.find(item => item.id === id)
        setCategory(category.title)
    }, [])

    useEffect(() => {
        socket.on('joined-stream', ({ viewers }) => {
            setViewersCount(viewers)
        })

        socket.on('leaved-stream', ({ viewers }) => {
            setViewersCount(viewers)
        })

        return () => {
            socket.emit('leave-straem', {
                id: streamKey
            })

            socket.off('leaved-stream')
            socket.off('joined-stream')
        }

    }, [])

    return (
        <div className="w-[100%]">
            <div className="player-wrapper">
                <ReactPlayer 
                    className='react-player'
                    width='100%'
                    height='100%'
                    playing={true} 
                    controls={true} 
                    url={`http://localhost:8000/live/${streamKey}/index.mpd`} 
                    config={{
                        forceDASH: true,
                    }} 
                />
            </div>
            <div className="flex justify-between items-center mt-3 px-3 py-2 rounded bg-[#3C096C4D]">
                <div>
                    <Button title='Subscribe' accent={true} />
                    <Button title='Follow' sx={{ margin: 'ml-2' }} onClick={() => dispatch(addFollow({ id: user.id, follow: streamKey }))} />
                </div>
                <span className="text-accent">Viewers: {viewersCount}</span>
            </div>
            <div className="my-4 flex items-center bg-[#3C096C4D] p-[28px]">
                <img src={`http://localhost:9000/avatars/${avatar}`} alt="Avatar" className="w-[48px] h-[48px] rounded-full mr-2" />
                <span>
                    <span className="text-accent text-lg font-semibold">{ username }</span>
                    <br />
                    <span className="text-accent text-base">{ categoryName }</span>
                </span>
            </div>
        </div>
    )
}

export default Stream