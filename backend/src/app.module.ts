import { Module } from '@nestjs/common';
import { NotificationModule } from './notification/notification.module';

@Module({
    imports: [NotificationModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
