# GitHub Followers Checker

Este script em Node.js verifica se seus seguidores no GitHub estão seguindo você de volta. Ele busca a lista de seguidores e seguidos para um determinado nome de usuário do GitHub e identifica seguidores mútuos e não seguidores.

## Como Usar
1. Clone este repositório.
2. Instale o Node.js, se ainda não o fez.
    ```bash
    https://nodejs.org/en

    npm install
1. execute
    ```bash
    node user.js
        > altere key/usuario.js
        > email = 'login git';
        > senha = 'senha git';
1. execute
    ```bash
    node webScrapingData.js
    em seu celular 
    Digite o número: ...

3. Execute os seguintes comandos no seu terminal:

    ```bash
    node src/checkFollower.js
    para verificar quem não esta te seguindo de volta

    node src/follow.js
    para clonar seguidores de outras pessoas

    node src/unfollow.js
    para deixar se seguir quem não te segue
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
