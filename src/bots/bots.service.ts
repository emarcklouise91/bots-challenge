import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
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

    private bots: any = [{ id: 1, name: 'Marck', gender: 'male', avatar: 'marckAvatar.png'}];

    findAll() {
        return this.bots;
    }

    findOneById(botId: number) {
        return this.bots.find(bot => bot.id === botId);
    }
}
