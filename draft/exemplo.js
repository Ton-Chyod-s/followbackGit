const axios = require('axios');

// Informações de autenticação
const username = 'seu_nome_de_usuario';
const token = 'seu_token_de_acesso'; // Você pode gerar um token de acesso na configuração de desenvolvedor do GitHub

// Nome do usuário que você deseja deixar de seguir
const nomeDoUsuario = 'nome_do_usuario_a_deixar_de_seguir';

// Configuração da requisição
const config = {
  headers: {
    'Authorization': `token ${token}`,
  }
};

// Fazendo a requisição para deixar de seguir o usuário
axios.delete(`https://api.github.com/user/following/${nomeDoUsuario}`, config)
  .then(response => {
    console.log(`Você deixou de seguir o usuário ${nomeDoUsuario}`);
  })
  .catch(error => {
    console.error('Ocorreu um erro:', error.response.data);
  });
