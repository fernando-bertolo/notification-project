import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { NotificationDTO } from '../dtos/notification.dto';
import { CreateNotificationDTO } from '../dtos/create-notification.dto';

@Injectable()
export class NotificationService {
    private readonly streamNotifications = new Subject<NotificationDTO>();

    observeStatus(): Observable<NotificationDTO> {
        return this.streamNotifications.asObservable();
    }

    sendNotification(notification: NotificationDTO) {
        this.streamNotifications.next(notification);
    }

    async processNotification(
        data: CreateNotificationDTO,
    ): Promise<NotificationDTO> {
        await new Promise((resolve) =>
            setTimeout(resolve, 1000 + Math.random() * 1000),
        );
        const randomNumber = Math.floor(Math.random() * 10) + 1;

        return {
            mensagemId: data.mensagemId,
            conteudoMensagem: data.conteudoMensagem,
            status:
                randomNumber % 2 === 0
                    ? 'PROCESSADO_SUCESSO'
                    : 'FALHA_PROCESSAMENTO',
        };
    }
}
