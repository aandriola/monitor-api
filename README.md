Nível: Projeto B

# monitor-api

API que gerencia dispositivos de rede cadastrados e informa se estão **online** ou **offline**
com base no último *heartbeat* recebido.

## Como subir

```bash
cp .env.example .env      # ajuste a senha
docker compose up --build
curl localhost:3000/health
```

## Como testar

```bash
docker compose up -d db   # só o banco
npm ci
npm run lint
npm run test:coverage
```

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| POST | `/devices` | Cadastra dispositivo (`name`, `host`, `type?`) |
| POST | `/devices/:id/heartbeat` | Registra que o dispositivo está vivo |
| GET | `/devices` | Lista com status online/offline |
| GET | `/health` | Healthcheck |
| GET | `/metrics` | Métricas Prometheus |

## Decisões e próximos passos

(preencher: ADR, SLO, desempenho)
