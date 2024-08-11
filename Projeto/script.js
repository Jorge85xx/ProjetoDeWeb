class Lembrete {
    constructor(titulo, descricao, data, usuario) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.data = data;
        this.usuario = usuario;
    }
}

class SistemaLembretes {
    constructor() {
        this.lembretes = JSON.parse(localStorage.getItem('lembretes')) || [];
        this.usuarioAtual = JSON.parse(localStorage.getItem('usuarioAtual'));

        if (!this.usuarioAtual) {
            localStorage.removeItem('usuarioAtual');
            window.location.href = '../Login/index_login.html'; 
        }

        this.lembreteEmEdicao = null;
        this.formCadastro = document.getElementById('form-cadastro');
        this.formEdicao = document.getElementById('form-edicao');
        this.listaLembretes = document.getElementById('lista-lembretes');

        this.formCadastro.addEventListener('submit', this.cadastrarLembrete.bind(this));
        this.formEdicao.addEventListener('submit', this.salvarEdicao.bind(this));
        this.renderizarLembretes();
    }

    renderizarLembretes() {
        this.listaLembretes.innerHTML = '';
        const lembretesUsuarioAtual = this.lembretes.filter(lembrete => lembrete.usuario.nome === this.usuarioAtual.nome);

        lembretesUsuarioAtual.forEach((lembrete, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${lembrete.titulo}</strong> - ${lembrete.descricao} (Data: ${lembrete.data})
                <div class="acoes">
                    <button onclick="sistemaLembretes.editarLembrete(${index})">Editar</button>
                    <button onclick="sistemaLembretes.excluirLembrete(${index})">Excluir</button>
                </div>
            `;
            this.listaLembretes.appendChild(li);
        });
    }

    cadastrarLembrete(event) {
        event.preventDefault();
        const titulo = document.getElementById('titulo').value;
        const descricao = document.getElementById('descricao').value;
        const data = document.getElementById('data').value;

        if (!this.usuarioAtual) {
            alert('Você precisa estar logado para cadastrar lembretes.');
            return;
        }

        const novoLembrete = new Lembrete(titulo, descricao, data, this.usuarioAtual);
        this.lembretes.push(novoLembrete);
        this.atualizarStorage();
        this.renderizarLembretes();
        this.formCadastro.reset();
    }

    editarLembrete(index) {
        this.lembreteEmEdicao = index;
        const lembrete = this.lembretes[index];
        document.getElementById('titulo-editar').value = lembrete.titulo;
        document.getElementById('descricao-editar').value = lembrete.descricao;
        document.getElementById('data-editar').value = lembrete.data;
        document.getElementById('edicao').style.display = 'block';
    }

    salvarEdicao(event) {
        event.preventDefault();
        const titulo = document.getElementById('titulo-editar').value;
        const descricao = document.getElementById('descricao-editar').value;
        const data = document.getElementById('data-editar').value;

        if (this.lembreteEmEdicao !== null) {
            this.lembretes[this.lembreteEmEdicao] = new Lembrete(titulo, descricao, data, this.usuarioAtual);
            this.atualizarStorage();
            this.renderizarLembretes();
            this.formEdicao.reset();
            document.getElementById('edicao').style.display = 'none';
        }
    }

    excluirLembrete(index) {
        this.lembretes.splice(index, 1);
        this.atualizarStorage();
        this.renderizarLembretes();
    }

    atualizarStorage() {
        localStorage.setItem('lembretes', JSON.stringify(this.lembretes));
    }

    sair() {
        localStorage.removeItem('usuarioAtual')
        window.location.href = '../Login/index_login.html'
    }
}

const sistemaLembretes = new SistemaLembretes();
