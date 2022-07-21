import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BotsInterface } from './bots.interface';
import { BotsService } from './bots.service';

@Controller('bots')
export class BotsController {   
    constructor(private botsService: BotsService) {}
    
    @Post()
    create(@Body() requestBody: BotsInterface): Observable<BotsInterface> {
        return this.botsService.create(requestBody);
    }

    @Get('all')
    getAll(): any {
        return this.botsService.findAll();
    }

    @Get(':id')
    getById(@Param('id') id: string): any {
        return this.botsService.findOneById(Number(id));
    }
}
