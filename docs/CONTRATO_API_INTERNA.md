\# CONTRATO DA API INTERNA



\## IA ROUTER



POST /internal/router



Entrada



{

&#x20; "telefone": "",

&#x20; "empresa": "",

&#x20; "perfil": "",

&#x20; "mensagem": "",

&#x20; "contexto": {}

}



Resposta



{

&#x20; "status": "",

&#x20; "modulo": "",

&#x20; "intencao": "",

&#x20; "confianca": 0,

&#x20; "dados": {}

}



\---



\## COMPROVA AI



POST /internal/comprova



Entrada



{

&#x20; "processamento\_id": "",

&#x20; "parametros": {}

}



Resposta



{

&#x20; "status": "",

&#x20; "mensagem": "",

&#x20; "anexos": \[],

&#x20; "dados": {}

}



\---



\## COCKPIT



POST /internal/cockpit



Entrada



{

&#x20; "processamento\_id": "",

&#x20; "parametros": {}

}



Resposta



{

&#x20; "status": "",

&#x20; "mensagem": "",

&#x20; "dados": {}

}



\---



Todos os módulos seguem exatamente o mesmo padrão de comunicação.

