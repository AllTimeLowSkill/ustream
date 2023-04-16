import { useParams } from "react-router-dom"
import Stream from "../components/Stream"
import StreamChat from "../components/StreamChat"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const StreamPage = () => {
    const { streams } = useSelector(state => state.streams)
    const { categories } = useSelector(state => state.category)

    const [stream, setStream] = useState(null)
    const [category, setCategory] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        const a = streams.find(item => item.streamId === id)
        setStream(a)
    }, [])
    
    
    useEffect(() => {
        if(stream) {
            const c = categories.find(item => item.id === stream.category)
            setCategory(c)
        }
    }, [stream])

    return (
        <>
            {
                stream && category?
                <div className="px-[28px] py-[24px] bg-[#10002B] min-h-[100vh]">
                    <div className="flex">
                        <Stream streamKey={id} avatar={stream.avatar} username={stream.username} id={category.id} />
                        <StreamChat id={id} />
                    </div>
                </div> : null
            }
        </>
    )
}

export default StreamPage