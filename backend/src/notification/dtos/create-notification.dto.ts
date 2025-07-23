import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateNotificationDTO {
    @IsString()
    @IsNotEmpty()
    @IsUUID('4', {
        message: 'mensagemId inválido',
    })
    mensagemId: string;

    @IsString()
    @IsNotEmpty({
        message: 'conteúdo da mensagem não pode ser vazio',
    })
    conteudoMensagem: string;
}
