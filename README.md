# Notes Generation Site

O "Notes Generation Site" é uma aplicação web moderna e interativa, construída com React e Vite, que oferece uma plataforma completa para criação, gerenciamento e compartilhamento de anotações. A interface é projetada para ser intuitiva e amigável, com funcionalidades que visam melhorar a produtividade e a organização do usuário.

## ✨ Funcionalidades Principais

O projeto conta com uma série de recursos para proporcionar uma experiência rica e fluida:

* **Criação e Edição de Notas:** Os usuários podem criar anotações personalizadas, definindo um título, um texto e escolhendo uma cor para o card da nota. A edição é feita através de um pop-up intuitivo que permite alterar qualquer um desses campos.
* **Gerenciamento de Notas:** É possível deletar anotações que não são mais necessárias. Uma janela de confirmação garante que nenhuma nota seja excluída acidentalmente.
* **Interação Social:** As notas podem ser "curtidas", e o sistema permite visualizar as notas de outros usuários da comunidade, tornando a plataforma colaborativa.
* **Compartilhamento Avançado:** Uma funcionalidade de compartilhamento permite que o usuário baixe suas anotações como um arquivo PDF ou as compartilhe diretamente na comunidade da plataforma.
* **Filtros e Pesquisa:** Para facilitar a organização, é possível filtrar as notas por data, utilizando um calendário interativo, ou buscar por termos específicos através de uma barra de pesquisa.
* **Perfil de Usuário Personalizável:** O usuário pode personalizar seu perfil, alterando o nome, nickname, e-mail e até mesmo a foto de avatar. As configurações são salvas localmente no navegador.
* **Dashboard do Usuário:** Uma barra lateral (SideBar) exibe informações relevantes como o perfil do usuário, um calendário para seleção de datas, um gráfico de atividades semanais e atalhos para notificações e configurações.
* **Interface Responsiva:** O design se adapta a diferentes tamanhos de tela, garantindo uma boa experiência tanto em desktops quanto em dispositivos móveis. As barras de navegação lateral e principal se ajustam dinamicamente.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

* **React:** Biblioteca principal para a construção da interface de usuário.
* **Vite:** Ferramenta de build extremamente rápida que oferece um ambiente de desenvolvimento moderno.
* **JavaScript (ES6+):** Linguagem de programação utilizada em todo o projeto.
* **CSS3:** Para estilização dos componentes, com uso de Flexbox e Grid Layout para criar layouts responsivos.
* **Font Awesome:** Biblioteca de ícones amplamente utilizada na interface para melhorar a experiência visual.
* **Chart.js:** Para a criação de gráficos interativos, como o de atividade semanal.
* **jsPDF:** Para a funcionalidade de exportação de notas para o formato PDF.

## 🚀 Como Executar o Projeto

Para executar este projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone <https://github.com/Augusto2599/Notes_Generation_Site.git>
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd notes_generation_site
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:5173` (ou em outra porta, caso a 5173 esteja em uso).
