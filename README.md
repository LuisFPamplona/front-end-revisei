## Revisei 
O Revisei é uma aplicação web moderna de gerenciamento de estudos, projetada para ajudar estudantes a organizar sua jornada de aprendizado. Os usuários podem gerenciar matérias e acompanhar tópicos específicos, garantindo um fluxo de revisão consistente e organizado.

## Funcionalidades
Dashboard Pessoal: Uma visão clara e objetiva do seu progresso nos estudos.

Gerenciamento de Matérias: Crie e organize diferentes disciplinas de estudo.

Acompanhamento de Tópicos: Fragmente suas matérias em tópicos específicos para um foco detalhado.

Fluxo de Autenticação Moderno: Telas de Login e Registro seguras com uma interface (UI/UX) polida.

Design Responsivo: Experiência totalmente otimizada para dispositivos móveis e desktop.

## Próximas Implementações (Roadmap)

O Revisei está em constante evolução. Estas são as funcionalidades planejadas para as próximas etapas do desenvolvimento:

- [ ] **Página Detalhada da Matéria:** Visualização focada onde o usuário poderá gerenciar os tópicos específicos de cada disciplina.
- [ ] **Sistema de Revisão Espaçada:** Implementação de lógica para sugerir revisões baseadas no tempo desde o último estudo.
- [ ] **Gráficos de Desempenho:** Dashboard visual com estatísticas de tópicos concluídos vs. pendentes.
- [ ] **Pesquisa e Filtros:** Funcionalidade para buscar matérias e tópicos rapidamente.
- [ ] **Modo Escuro:** Suporte a temas para maior conforto visual durante estudos noturnos.
- [ ] **Upload de Arquivos:** Possibilidade de anexar PDFs ou imagens de resumos diretamente nos tópicos.

## Tecnologias Utilizadas
Frontend: React + TypeScript

Estilização: Tailwind CSS

Ícones: Lucide React

Roteamento: React Router Dom

Integração com Backend: Fetch API com camadas de serviço customizadas.

## Visualização
<div align="center">
<img src="https://i.imgur.com/ec3lhtm.png" alt="Subjects Desktop Screen" width="900">


<img src="https://i.imgur.com/IwiMIsQ.png" alt="Login Mobile Screen" width="300">
<img src="https://i.imgur.com/h5lDSId.png" alt="Register Mobile Screen" width="300">
<img src="https://i.imgur.com/815T3mD.png" alt="Subjects Mobile Screen" width="300">
</div>

## Estrutura do Projeto
O projeto segue uma arquitetura modular para facilitar a manutenção:

```text
src/
├── components/ # Componentes de UI reutilizáveis (Cards, Inputs, Sidebar)
├── pages/      # Views da aplicação (Home, Login, Register)
├── services/   # Lógica de integração com a API
├── types/      # Interfaces e tipos TypeScript
├── utils/      # Funções auxiliares e validadores
└── routes/     # Configuração de navegação e rotas

```

## Como Começar

> **Importante:** Esta aplicação depende do [Revisei Backend](https://github.com/LuisFPamplona/back-end-revisei.git) para funcionar. Certifique-se de que o servidor esteja rodando antes de iniciar o frontend.

### Pré-requisitos
- Node.js (v18 ou superior)
- Backend do projeto em execução

### Instalação

1. **Clone os repositórios:**
   ```bash
   # Clone o Frontend
   git clone https://github.com/LuisFPamplona/front-end-revisei.git
   
   # Clone o Backend (em outra pasta)
   git clone https://github.com/LuisFPamplona/back-end-revisei.git

👤 Autor
Luis Pamplona

LinkedIn: www.linkedin.com/in/luis-pamplona-552030310

GitHub: @LuisFPamplona

Feito com ❤️ para um aprendizado melhor.
