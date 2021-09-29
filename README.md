# Teste tecnico u4crypto

### Ferramentas necessárias:

* Docker / Docker Compose
* Node v14.x

*****

### Primeiros passos pré-execução:

Feito o clone do projeto, execute os seguintes comandos dentro da raiz do projeto:

<ul>
  <li><code>docker-compose up -d</code> para inicialização do DB</li>
  <li><code>npm run typeorm:run</code> para execução das migrations</li>
  <li>
    Criação e preenchimento do arquivo <code>.env</code>. Segue sugestões:
    <ul>
      <li><code>PORT</code> 3000</li>
      <li><code>HOST</code> 127.0.0.1</li>
      <li><code>JWT_SECRET</code> u4crypto</li>
      <li><code>JWT_ALGORIThM</code> HS256</li>
      <li><code>TOKEN_EXPIRATION_TIME</code> 4h</li>
    </ul>
  </li>
  <li><code>npm run start:dev</code> para execução do servidor</li>
</ul>

*****

# Rotas

## Auth

### {{server}}/auth/signup

Essa rota é responsável pela criação de um cliente e retorna os dados salvos (exceto a senha) junto do token de autenticação. Caso já exista o registro da pessoa como terceiro, os dados serão atualizados. A verificação é feita com base no CPF informado.

A rota exige obrigatoriamente, o envio de todos os dados abaixo no body da requisição: 

* ```name: string```
*  ```email: string```
*  ```cellphone: string```
*  ```cpf: string```
*  ```rg: string```
*  ```login: string```
*  ```password: string```

### {{server}}/auth/login

Essa rota é responsável pela geração de token de autenticação

A rota exige o envido dos seguintes campos no body da requisição:

*  ```login: string```
*  ```password: string```

### {{server}}/auth/edit

Rota responsável para edição de clientes. Recebe os seguintes campos no body da requisição. **É necessário inserir o token de autenticação no header da requisição como *Authorization***

* ```name: string```
*  ```email: string```
*  ```cellphone: string```
*  ```cpf: string```
*  ```rg: string```
*  ```login: string```
*  ```password: string```

### {{server}}/accident/create

Rota responsável pelo registro de acidentes ocorridos com os clientes. Recebe os seguintes campos no body da requisição. **É necessário inserir o token de autenticação no header da requisição como *Authorization***

+  ```license_plate: string```
+  ```third_parties: array```
    - ```name: string```
    -  ```email: string```
    -  ```cellphone: string```
    -  ```cpf: string```
    -  ```rg: string```

Para exemplificar, segue abaixo um JSON de exemplo para essa rota:

~~~JSON
{
    "third_parties": [
        {
            "name": "Josefina pao e vinho",
            "email": "teste@teste.com.dk",
            "cellphone": "31998178945",
            "cpf": "14715898521",
            "rg": "SP18158143"
        },
        {
            "name": "Josemino pao e vinho",
            "email": "teste@teste.com.sy",
            "cellphone": "21998178945",
            "cpf": "59385857088",
            "rg": "ES18158143"
        },
        {
            "name": "Marcelino pao e vinho",
            "email": "teste@teste.com.cn",
            "cellphone": "51998178945",
            "cpf": "47149971067",
            "rg": "PA18158143"
        }
    ],
    "license_plate": "PSP1435"
}
~~~




















