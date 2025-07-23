# Notification Project

Sistema de notificações utilizando Angular, NestJS e RabbitMQ para publicação de mensagens em filas.


## 🚀 Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/fernando-bertolo/notification-project.git
cd notification-project
```

### 2. Subir o RabbitMQ com Docker


Crie um arquivo `docker-compose.yml` na raiz do projeto:

```yaml
services:
  rabbitmq:
    container_name: rabbitmq
    image: rabbitmq:3-management
    ports:
      - "5672:5672"
      - "15672:15672"
    networks:
      - project-network

networks:
  project-network:
    driver: bridge
```

Execute:
```bash
docker-compose up -d
```

### 3. Instalar dependências do backend

```bash
cd backend
npm install
```
```

### 4. Executar o backend

```bash
# Desenvolvimento
npm run start:dev

```

## 🔧 Configuração

### RabbitMQ Management

Acesse o painel de gerenciamento do RabbitMQ:
- URL: http://localhost:15672
- Usuário: `guest`
- Senha: `guest`

### Estrutura do Projeto

```
backend/
└── src/
    ├── notification/
    │   ├── controllers/ 
    │   │   └── notification.controller.ts
    │   │   └── notification-consumer.controller.ts
    │   │
    │   ├── services/
    │   │   ├── notification.service.ts
    │   │
    │   ├── dtos/
    │   │   └── notificacao.dto.ts
    │   │
    │   └── notification.module.ts
    │
    └── shared/
        ├── constants/
        │   └── rabbitmq.constants.ts
        │
        ├── filters/
        │   └── http-exception.filter.ts
        │
        └── interceptors/
            └── transform.interceptor.ts

```


## Angular
```bash
cd frontend
npm install
```
```

### 4. Executar o frontend

```bash
# Desenvolvimento
ng serve