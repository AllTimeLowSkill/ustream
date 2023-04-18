import ReactPlayer from "react-player"

const Player = ({ streamKey }) => {

    return (
        <ReactPlayer
            className='react-player'
            width='100%'
            height={720}
            playing={true}
            controls={true}
            url={`http://localhost:8000/live/${streamKey}/index.mpd`}
            config={{
                forceDASH: true
            }}
        />
    )
}

export default Player