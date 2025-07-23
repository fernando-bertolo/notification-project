import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Inject,
    Post,
    Sse,
} from '@nestjs/common';
import { CreateNotificationDTO } from '../dtos/create-notification.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { NotificationDTO } from '../dtos/notification.dto';
import { ClientProxy } from '@nestjs/microservices';
import { NotificationService } from '../services/notification.service';
import { NOTIFICATION_CLIENT } from 'src/shared/constants/notification-service.constants';

@Controller('api/notificar')
export class NotificationController {
    constructor(
        @Inject(NOTIFICATION_CLIENT)
        private readonly client: ClientProxy,
        private readonly notificationService: NotificationService,
    ) {}

    @Post()
    @HttpCode(HttpStatus.ACCEPTED)
    async sendNotification(@Body() body: CreateNotificationDTO) {
        await lastValueFrom(
            this.client.emit('fila.notificacao.entrada.bertolo', body),
        );
        return { message: 'notification sent to the queue' };
    }

    @Sse('status')
    statusStream(): Observable<NotificationDTO> {
        return this.notificationService.observeStatus();
    }
}
