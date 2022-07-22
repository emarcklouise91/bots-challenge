import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { BotsInterface } from './bots.interface';
import { BotsService } from './bots.service';

@Controller('bots')
export class BotsController {   
    constructor(private botsService: BotsService) {}
    
    @Post()
    create(@Body() requestBody: BotsInterface): Observable<BotsInterface> {
        return this.botsService.create(requestBody);
    }

    @Get()
    getAll() {
        return this.botsService.findAll();
    }

    @Get(':purpose')
    getAllByPurpose(@Param('purpose') purpose: "healthcare" | "home" | "logistics") {
        return this.botsService.findAllByPurpose(purpose);
    }

    @Get(':id')
    getById(@Param('id') botId: string) {
        return this.botsService.findOneById(Number(botId));
    }

    @Put(':id')
    update(
        @Param('id') botId: number,
        @Body() requestBody: BotsInterface
    ): Observable<UpdateResult> {
        return this.botsService.update(Number(botId), requestBody); // enhance this by returning updated record
    }

    @Delete(':id')
    delete(@Param('id') botId: number): Observable<DeleteResult> {
        return this.botsService.delete(Number(botId));
    }
}
