export type NotificationStatus = 'PROCESSADO_SUCESSO' | 'FALHA_PROCESSAMENTO';

export type NotificationDTO = {
    mensagemId: string;
    conteudoMensagem: string;
    status: NotificationStatus;
};
