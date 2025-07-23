import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

interface Notificacao {
  mensagemId: string;
  conteudoMensagem: string;
  status: string;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App  implements OnInit {
  conteudoMensagem = '';
  notificacoes: Notificacao[] = [];

  constructor(private http: HttpClient, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.ouvirStatus();
  }

  enviarNotificacao() {
    const mensagemId = uuidv4();
    const conteudo = this.conteudoMensagem;

    const notificacao: Notificacao = {
      mensagemId,
      conteudoMensagem: conteudo,
      status: 'AGUARDANDO PROCESSAMENTO',
    };

    this.notificacoes = [...this.notificacoes, notificacao];

    this.http.post('http://localhost:3000/api/notificar', {
      mensagemId,
      conteudoMensagem: conteudo,
    }).subscribe({
      next: () => {
        console.log('Notificação enviada com sucesso');
        this.conteudoMensagem = '';
      },
      error: (err) => {
        console.error('Erro ao enviar notificação', err);
        notificacao.status = 'ERRO AO ENVIAR';
      }
    });
  }

  ouvirStatus() {
    const eventSource = new EventSource('http://localhost:3000/api/notificar/status');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const notificacao = this.notificacoes.find(n => n.mensagemId === data.mensagemId);
      if (notificacao) {
        notificacao.status = data.status;
      }
      this.changeDetectorRef.detectChanges();
    };

    eventSource.onerror = (err) => {
      console.error('Erro no SSE', err);
      eventSource.close();
    };
  }
}
