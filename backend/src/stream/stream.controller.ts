import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { StreamService } from './stream.service';

@Controller('stream')
export class StreamController {
    constructor(
        private readonly streamService: StreamService
    ) {}
    
    @Get('/')
    getStreams() {
        return this.streamService.getStreams()
    }

    @Post('/create')
    createStream(@Body() data: any) {
        return this.streamService.createStreamData(data)
    }

    @Put('/update/:id')
    updateStreamCategory(@Param('id') id: string, @Body() data: any) {
        return this.streamService.updateStreamCategory(data.id, data.streamKey)
    }

    @Delete('/:id')
    deleteStream(@Param('id') id: string) {
        return this.streamService.deleteStreamData(id)
    }
}
