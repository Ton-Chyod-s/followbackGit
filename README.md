# GitHub Followers Checker

Este script em Node.js verifica se seus seguidores no GitHub estão seguindo você de volta. Ele busca a lista de seguidores e seguidos para um determinado nome de usuário do GitHub e identifica seguidores mútuos e não seguidores.

Na recente atualização, foi introduzida uma função que permite aos usuários clonarem os seguidores de outros perfis, além de possibilitar deixar de seguir aqueles que não os seguem de volta.

## Como Usar
1. Clone este repositório.
2. Instale o Node.js, se ainda não o fez.
    ```bash
    https://nodejs.org/en

    npm install
    npm install fs, express, nodemon, axios
1. execute
    ```bash
    node ./src/utility/user.js
        > altere key/usuario.js
        > email = 'login git';
        > senha = 'senha git';
1. execute
    ```bash
    node ./src/utility/webScrapingData.js
        > em seu celular 
        > Digite o número: ...

3. Execute os seguintes comandos no seu terminal:

    ```bash
    node src/checkFollower.js
    para verificar quem não esta te seguindo de volta

    node src/checkFollow.js
    para verificar quem esta te seguindo e você não segue

    node src/follow.js
    para clonar seguidores de outros usuarios

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
    npm install fs, express, nodemon, axios
    nodemon index.js
4. Acesse um navegador com seguinte endereço
   
    ```bash
    http://localhost:3000/<usuário_a_ser_pesquisado>
    
Substitua <usuário_a_ser_pesquisado> pelo nome de usuário do GitHub que você deseja pesquisar (por exemplo, Ton Chyod-s).

#### Exemplo de Saída
    
    {
        "": "Welcome to the GitHub Followers Checker API",
        "First": "Create user with your git - /usuario/:email/:password",
        "Second": "Get token - /token",
        "View followers": "Example - comparacaoSeguindo/:username",
        "Get more followers": "Example - /seguir/:username/:user",
        "Unfollow": "Example - /naoSeguir/:username",
    }

## Contribuição

Sinta-se à vontade para contribuir abrindo issues ou pull requests.

## Video
### GitHub Followers Checker
<br>
<div style="display: inline_block">
<a href="https://www.youtube.com/@Ton-Chyod-s">
<img height=110 src="https://images.tcdn.com.br/img/img_prod/1076751/teste_2_591_1_db9b616c9397e918b1d43802d3dea23b.jpg"/>
</a>
</div>

## Licença
Este projeto está licenciado sob a Licença MIT - consulte o arquivo LICENSE para obter mais detalhes.
