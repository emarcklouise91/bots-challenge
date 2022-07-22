import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { BotsEntity } from './bots.entity';
import { BotsInterface } from './bots.interface';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class BotsService {
    constructor(
        @InjectRepository(BotsEntity)
        private readonly botsRepository: Repository<BotsEntity>
    ) {}

    create(parameters: BotsInterface): Observable<BotsInterface> {
        const uuid = uuidv4();
        
        return from(this.botsRepository.save({
            ...parameters, 
            ...{
                code: uuid,
                avatar: `https://avatars.dicebear.com/api/${parameters.gender}/${uuid}.png`,
                updated_at: null
            }
        }));
    }

    findAll(): Observable<BotsInterface[]> {
        return from(this.botsRepository.find());
    }

    findAllByPurpose(purpose: "healthcare" | "home" | "logistics"): Observable<BotsInterface[]> {
        return from(this.botsRepository.find({
            where: [{purpose: purpose}]
        }));
    }

    findOneById(botId: number): Observable<BotsInterface> {
        return from(this.botsRepository.findOne({
            where: [{id: botId}]
        }));
    }

    update(botId: number, parameters: BotsInterface): Observable<UpdateResult> {
        return from(this.botsRepository.update(botId, parameters));
    }

    delete(botId: number): Observable<DeleteResult> {
        return from(this.botsRepository.delete(botId));
    }
}
