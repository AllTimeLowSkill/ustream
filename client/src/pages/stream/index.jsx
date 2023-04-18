import { useParams } from "react-router-dom"
import Player from "./components/Player"
import StreamChat from "./components/StreamChat"
import StreamInfo from "./components/StreamInfo"
import { useMemo } from "react"

const Stream = () => {
    const { id } = useParams()

    const [stream, category] = useMemo(() => {
        const streams = JSON.parse(sessionStorage.getItem('streams'))
        const categories = JSON.parse(sessionStorage.getItem('categories'))
        const stream = streams.find(item => item.streamId === id)
        const category = categories.find(item => item.id === stream.category)
        return [stream, category]
    }, [])

    return (
        <section className="px-[28px] py-[48px] flex">
            <section className="mr-[18px]">
                <Player streamKey={id} />
                <StreamInfo avatar={stream.avatar} username={stream.username} category={category.title} />
            </section>
            <StreamChat id={id} />
        </section>
    )
}

export default Stream