# 🏋️‍♂️ Sistema Personal Trainer

Aplicação **full-stack** para gerenciamento de alunos, avaliações físicas, fichas de treino e exercícios. O sistema permite cadastrar, editar, excluir e listar dados de forma organizada, com upload de fotos dos alunos e autenticação com login.

---

## 🚀 Tecnologias Utilizadas

### 🔧 Backend
- Node.js
- Express.js
- MySQL
- JWT (autenticação)
- Multer (upload de fotos)

### 🎨 Frontend
- React.js
- React Router
- Bootstrap
- Context API (autenticação)

---

## 📁 Estrutura do Projeto

personal-trainer/
├── backend/
│   ├── controller/
│   ├── middlewares/
│   ├── model/
│   ├── routers/
│   └── uploads/
├── frontend/
│   └── src/
│       ├── Componentes/
│       ├── contexts/
│       ├── Paginas/
│       ├── services/
│       └── App.js (e outros arquivos)
├── .env.example
├── .gitignore
├── README.md

---

## 🔐 Autenticação

O sistema utiliza autenticação via **JWT** com:
- Tela de login no frontend
- Proteção de rotas no backend com middleware
- Context API no React para manter o usuário logado

---

## 📸 Upload de Fotos

O backend suporta **upload de imagem do aluno** usando Multer.  
As imagens são exibidas no frontend e salvas na pasta `/backend/uploads`.

---

### Repositório

git clone https://github.com/jaumpauloferreira/Sistema_Personal_Trainer.git

👨‍💻 Desenvolvido por
João Paulo Ferreira da Silva
🔗 LinkedIn https://www.linkedin.com/in/jaumpauloferreira/

