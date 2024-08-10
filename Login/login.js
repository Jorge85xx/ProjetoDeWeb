class Usuario {
    constructor(nome, senha) {
        this.nome = nome;
        this.senha = senha;
    }
}

class SistemaUsuarios {
    constructor() {
        this.usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        this.usuarioAtual = JSON.parse(localStorage.getItem('usuarioAtual')) || null;

        this.formLogin = document.getElementById('form-login');
        this.formCadastro = document.getElementById('form-cadastro');
        this.loginMensagem = document.getElementById('login-mensagem');
        this.cadastroMensagem = document.getElementById('cadastro-mensagem');

        this.formLogin.addEventListener('submit', this.fazerLogin.bind(this));
        this.formCadastro.addEventListener('submit', this.fazerCadastro.bind(this));
    }

    mostrarMensagem(elemento, mensagem) {
        elemento.textContent = mensagem;
        elemento.style.display = 'block';
    }

    esconderMensagem(elemento) {
        elemento.style.display = 'none';
    }

    fazerLogin(event) {
        event.preventDefault();
        const nome = document.getElementById('login-nome').value;
        const senha = document.getElementById('login-senha').value;

        const usuario = this.usuarios.find(user => user.nome === nome);

        if (!usuario) {
            this.mostrarMensagem(this.loginMensagem, 'Usuário não encontrado.');
        } else if (usuario.senha !== senha) {
            this.mostrarMensagem(this.loginMensagem, 'Senha incorreta.');
        } else {
            this.usuarioAtual = usuario;
            localStorage.setItem('usuarioAtual', JSON.stringify(this.usuarioAtual));
            window.location.href = '../Projeto/index.html';  // Redireciona para o sistema de lembretes
        }
    }

    fazerCadastro(event) {
        event.preventDefault();
        const nome = document.getElementById('cadastro-nome').value;
        const senha = document.getElementById('cadastro-senha').value;

        if (this.usuarios.find(user => user.nome === nome)) {
            this.mostrarMensagem(this.cadastroMensagem, 'Usuário já existe.');
        } else {
            const novoUsuario = new Usuario(nome, senha);
            this.usuarios.push(novoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
            alert('Cadastro realizado com sucesso!');
            window.location.href = '../Projeto/index.html';  // Redireciona para o sistema de lembretes após cadastro
        }
    }
}

const sistemaUsuarios = new SistemaUsuarios();