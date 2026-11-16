# Desempenho

## SLO

95% das requisições de `GET /devices` respondem em menos de 300 ms.

## Como medir

1. `docker compose up --build`
2. Em outro terminal: `k6 run k6/smoke.js`

## Resultado medido

- Data: 16/11/2026
- Ambiente: WSL2 (Ubuntu) + Docker Desktop, API e Postgres em contêineres na mesma máquina
- Comando: `k6 run k6/smoke.js`
- Carga: 5 VUs por 30 s (cada VU faz um heartbeat e um `GET /devices` por segundo)
- Total: 299 requisições, 149 iterações

| Métrica | Valor |
|---|---|
| p95 de `GET /devices` (`http_req_duration{name:list}`) | 28,3 ms |
| p95 geral (todas as requisições) | 39,44 ms |
| Mediana geral | 11,04 ms |
| Máximo geral | 162,64 ms |
| Falhas (`http_req_failed`) | 0,00% (0 de 299) |
| Checks | 100% (298 de 298) |

**SLO atendido: sim** (28,3 ms, bem abaixo de 300 ms).

## Observações

- É um smoke test: carga leve (cerca de 10 requisições por segundo) e tabela
  com poucos registros. Ele prova que o fluxo responde dentro do SLO, mas não
  mede o limite da API.
- O máximo de 162 ms aparece uma vez e provavelmente é o aquecimento da conexão
  com o banco no início do teste.
- O que eu faria diferente: testar com milhares de dispositivos cadastrados,
  aumentar os VUs e adicionar paginação ao `GET /devices`, que hoje devolve
  todos os registros.
