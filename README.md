# Projeto feito em NodeJs aplicando o JWT

<p>Projeto feito no intuito de aplicar todods os passos para uma aplicação mais segura
com o uso de JWT (JSON Web Token).</p>

O código funciona de uma forma simples, temos no banco de dados uma tabela chamada *users*, que por sua vez
no backend existem 3 rotas para ela. Sendo elas:
- criarUser (post);
- login (post);
- verUsers (get).
<p>Quando o usuário que já está cadastrado no banco de dados faz seu login, é gerado uma chave de autenticação que se expirará em 5 minutos, sendo possível alterar esse valor, então com essa chave, autenticamos nossa rota de <b>verUsers</b>, sendo possível apenas acessá-la passando no cabeçalho da requisição o token gerado ao login, todas essas etapas de guardar o token e enviá-lo depois para o servidor de volta é feito pelo client, não passando nada disso para o usuário.</p>


### Instalando as depedências

```
<b>yarn</b> 
ou
**npm install**
```

### Rodando projeto

```
**yarn run dev:server**
ou
**npm run dev:server**
```
