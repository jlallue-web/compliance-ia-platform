\# CONTRATO ENTRE O IA ROUTER E OS MÓDULOS



\## Objetivo



Todo módulo da Compliance IA Platform deverá implementar a mesma interface de comunicação.



\---



\## Entrada



O IA Router enviará um objeto contendo:



\- telefone

\- empresa

\- perfil

\- modulo

\- intencao

\- contexto

\- parametros

\- mensagem\_original

\- data\_hora



\---



\## Saída



Todo módulo deverá retornar:



\- status

\- mensagem

\- dados

\- anexos

\- proxima\_acao

\- log



\---



\## Responsabilidades



\### IA Router



\- Interpretar intenção.

\- Escolher o módulo.

\- Manter o contexto.

\- Registrar processamento.



\### Módulo



\- Executar apenas sua responsabilidade.

\- Nunca interpretar novamente a intenção.

\- Nunca acessar diretamente outro módulo.



\---



\## Regra



Toda comunicação entre módulos deverá ocorrer através do IA Router.

