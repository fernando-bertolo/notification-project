import { Logger, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationController } from './controllers/notification.controller';
import { NotificationService } from './services/notification.service';
import { NotificationConsumerController } from './controllers/notification-consumer.controller';
import { RabbitMQQueues } from 'src/shared/constants/rabbitmq.constants';
import { NOTIFICATION_CLIENT } from 'src/shared/constants/notification-service.constants';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: NOTIFICATION_CLIENT,
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://localhost:5672'],
                    queue: RabbitMQQueues.NOTIFICACAO_ENTRADA,
                    queueOptions: {
                        durable: true,
                    },
                },
            },
        ]),
    ],
    providers: [Logger, NotificationService],
    exports: [],
    controllers: [NotificationController, NotificationConsumerController],
})
export class NotificationModule {}
