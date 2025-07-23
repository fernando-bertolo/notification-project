import { Controller, Inject, Logger } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationService } from '../services/notification.service';
import { NotificationDTO } from '../dtos/notification.dto';
import { NotificationController } from './notification.controller';
import { CreateNotificationDTO } from '../dtos/create-notification.dto';
import { RabbitMQQueues } from 'src/shared/constants/rabbitmq.constants';
import { NOTIFICATION_CLIENT } from 'src/shared/constants/notification-service.constants';

@Controller()
export class NotificationConsumerController {
    constructor(
        private readonly logger: Logger,
        private readonly notificationService: NotificationService,
        @Inject(NOTIFICATION_CLIENT)
        private readonly client: ClientProxy,
    ) {}

    @MessagePattern(RabbitMQQueues.NOTIFICACAO_ENTRADA)
    async processNotification(@Payload() data: CreateNotificationDTO) {
        this.logger.log('notification received', NotificationController.name);

        const notification =
            await this.notificationService.processNotification(data);

        this.client.emit(RabbitMQQueues.NOTIFICACAO_STATUS, notification);

        this.logger.log(
            `notification status sent to the queue`,
            NotificationController.name,
        );
    }

    @MessagePattern(RabbitMQQueues.NOTIFICACAO_STATUS)
    consumeStatusNotifications(@Payload() data: NotificationDTO) {
        this.logger.log(
            `notification status received: ${data.status} - ${data.mensagemId}`,
            NotificationController.name,
        );
        this.notificationService.sendNotification(data);
    }
}
