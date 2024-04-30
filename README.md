# GitHub Followers Checker

Este script em Node.js verifica se seus seguidores no GitHub estão seguindo você de volta. Ele busca a lista de seguidores e seguidos para um determinado nome de usuário do GitHub e identifica seguidores mútuos e não seguidores.

## Como Usar
1. Clone este repositório.
1. Altere a pasta **key#** para **key**
2. Altere o arquivo token com sua token registrada no link:
   ```bash
   https://github.com/settings/tokens
   
* Generate a personal access token
* Nome token: 
    * Note
    * Expiration: No expiration
    * Select scopes:
      * repo full
      * user full
      * admin:ssh_signing_key full
      * Finish generete token

2. Instale o Node.js, se ainda não o fez.
3. Execute os seguintes comandos no seu terminal:

    ```bash
    npm install
    node src/checkFollower.js

## Exemplo de Saída
    
    {
    "seguidor 0": "usuário1",
    "seguidor 1": "usuário2",
    "erro": "Todos os seguidores estão seguindo de volta!"
    }

### ~ Api GitHub Followers Checker

#### Como Usar

1. Clone este repositório.
2. Instale o Node.js, se ainda não o fez.
3. Execute os seguintes comandos no seu terminal:

    ```bash
    npm install
    npm install express, nodemon
    nodemon index.js
4. Acesse um navegador com seguinte endereço
   
    ```bash
    http://localhost:3000/<usuário_a_ser_pesquisado>
    
Substitua <usuário_a_ser_pesquisado> pelo nome de usuário do GitHub que você deseja pesquisar (por exemplo, Ton Chyod-s).

#### Exemplo de Saída
    
    {"seguidor 0": "usuário1","seguidor 1": "usuário2","erro": "Todos os seguidores estão seguindo de volta!"}

## Contribuição

Sinta-se à vontade para contribuir abrindo issues ou pull requests.

## Licença
Este projeto está licenciado sob a Licença MIT - consulte o arquivo LICENSE para obter mais detalhes.
