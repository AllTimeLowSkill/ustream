const spawn = require('child_process').spawn

const generateStreamThumbnails = (streamKey) => {
    const args = [
        '-y',
        '-i', 'http://127.0.0.1:8000/live/' + streamKey + '/index.m3u8',
        '-ss', '00:00:01',
        '-vframes', '1',
        '-vf', 'scale=-2:300',
        './thumbnails/' + streamKey+ '.png',
    ]
    spawn('C:/projects/hate/rtmp-server/ffmpeg/ffmpeg.exe', args, {
        detached: true,
        stdio: false
    }).unref()
}

module.exports = {
    generateStreamThumbnails
}