const { default: axios } = require('axios')
const { generateStreamThumbnails } = require('../streamThumbnail')

const CronJob = require('cron').CronJob

const job = new CronJob('*/5 * * * * *', async () => {
    const response = await axios.get(`http://localhost:8000/api/streams`)
    if(typeof response.data !== undefined) {
        const live_streams = response.data['live']
        for(let stream in live_streams) {
            if(!live_streams.hasOwnProperty(stream)) continue
            generateStreamThumbnails(stream)
        }
    }
}, null, true)

const streamViewersJob = new CronJob('*/5 * * * * *', (io, id) => {
    const viewers = io.of('/').adapter.rooms.get(id).size
    io.to(id).emit('viewers', {
        viewers
    })
})

module.exports = { job, streamViewersJob }