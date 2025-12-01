# Sistema  de Check-in de Funcionários

Este projeto consiste em um sistema completo (Fullstack) para gerenciamento de check-in e check-out de funcionários, com cálculo automático de horas trabalhadas e regras de negócio para consistência de dados.

O projeto foi desenvolvido seguindo os princípios **SOLID** e arquitetura em camadas (Controller, Service, Repository).

## 🚀 Tecnologias Utilizadas

### Backend
- **Java 17** (Spring Boot 3.5.8)
- **Spring Data JPA** (Persistência)
- **PostgreSQL** (Banco de Dados)
- **Docker** (Containerização)
- **Swagger / OpenAPI** (Documentação da API) 
- **JUnit 5 & Mockito** (Testes Unitários)

### Frontend
- **React** (Vite + TypeScript)
- **Styled Components** (Estilização via CSS-in-JS)
- **Axios** (Integração com API)
- **ESLint + Prettier** (Qualidade de Código)

---

## ⚙️ Pré-requisitos

Certifique-se de ter instalado:
- Docker & Docker Compose
- Java 17
- Node.js (v18 ou superior)

---

## 🏃‍♂️ Como Rodar o Projeto (Localmente)

### 1. Subir o Banco de Dados
Na raiz do projeto, execute o Docker Compose para iniciar o PostgreSQL:
```bash
docker-compose up -d postgres
```

### 2. Rodar o Backend (API)
Em um terminal, acesse a pasta backend:
```bash
cd backend
# Comando para garantir o uso do Java 17 (Linux/Mac)
JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64 ./mvnw spring-boot:run
# Windows
.\mvnw spring-boot:run
```
A API estará disponível em: http://localhost:8080

### 🔗 Documentação Swagger:

http://localhost:8080/swagger-ui/index.html

## 3. Rodar o Frontend (Web)

Em outro terminal, acesse a pasta frontend:
```bash
cd frontend
npm install
npm run dev
```
Acesse a aplicação em: http://localhost:5173

## ✅ Funcionalidades & Regras de Negócio

### 1. Autenticação Simples:

Cadastro de novos funcionários.

Login validado no Backend (retorna dados do usuário).

### 2. Registro de Ponto:

Check-in: Registra horário de entrada.


Regra: Não permite dois check-ins abertos consecutivamente.

Check-out: Registra saída e calcula a duração.


Regra: Calcula automaticamente o tempo trabalhado em minutos e salva no banco.

### 3. Dashboard:

Visualização do status atual (Trabalhando/Fora).

Histórico de registros com formatação de data e duração.

## 🧪 Testes Unitários

O backend possui cobertura de testes para as regras críticas de negócio (cálculo de horas e bloqueio de duplicidade). Para rodar:

```bash
cd backend
./mvnw test
```

## 📂 Estrutura do Projeto

O projeto segue uma estrutura de Monorepo organizado:

```text
/
├── backend/                     # API Spring Boot (Java 17)
│   ├── src/main/java/com/desafio/checkin
│   │   ├── config/              # Configurações Globais (WebConfig/CORS)
│   │   ├── controller/          # Controladores REST (Auth, WorkRecord)
│   │   ├── dto/                 # Objetos de Transferência (LoginDTO)
│   │   ├── model/               # Entidades JPA (Employee, WorkRecord)
│   │   ├── repository/          # Interfaces de Banco de Dados
│   │   └── service/             # Regras de Negócio e Validações
│   ├── src/test/                # Testes Unitários (JUnit + Mockito)
│   └── Dockerfile               # Configuração da Imagem Java
│
├── frontend/                    # Aplicação Web (React + Vite)
│   ├── src/
│   │   ├── components/          # Componentes Visuais Reutilizáveis (SharedStyles)
│   │   ├── pages/               # Páginas da Aplicação (Login, Dashboard)
│   │   ├── styles/              # Estilos Globais (GlobalStyles)
│   │   ├── utils/               # Funções Utilitárias (Validação de Formulário)
│   │   ├── App.tsx              # Configuração de Rotas
│   │   └── main.tsx             # Ponto de Entrada
│   └── package.json             # Dependências e Scripts
│
├── docker-compose.yml           # Orquestração dos Containers (App + Banco)
└── README.md                    # Documentação do Projeto