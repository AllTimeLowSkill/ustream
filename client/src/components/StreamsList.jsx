import { Link } from "react-router-dom"
import StreamListItem from "./StreamListItem"

const StreamList = ({ streams }) => {

    return (
        <div className="px-[28px] py-[38px]">
            <p className="text-accent text-5xl font-semibold"><span className="text-[#E0AAFF]">Live channels</span> you might like</p>
            {
                streams? 
                    <div className="mt-3">
                        {
                            streams.map(stream => (
                                <Link to={`/stream/${stream.streamId}`} key={stream.streamId}>
                                    <StreamListItem streamkey={stream.streamId} username={stream.username} avatar={stream.avatar} id={stream.category} />
                                </Link>
                            ))
                        }
                    </div> : null
            }
        </div>
    )
}

export default StreamList