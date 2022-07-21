import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotsController } from './bots.controller';
import { BotsEntity } from './bots.entity';
import { BotsService } from './bots.service';

@Module({
    imports: [TypeOrmModule.forFeature([BotsEntity])],
    controllers: [BotsController],
    providers: [BotsService]
})
export class BotsModule {}
