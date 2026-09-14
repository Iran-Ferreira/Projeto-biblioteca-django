# Biblioteca Online

Aplicacao de biblioteca com API Django REST Framework e frontend React + Vite.

## Estrutura

- `biblioteca/`: configuracao Django.
- `livros/`: modelo e endpoints CRUD de livros.
- `usuarios/`: cadastro de usuarios.
- `frontend/`: interface React responsiva.

## Backend

Crie e ative um ambiente virtual, depois instale as dependencias:

```bash
python3.12 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Configure `DATABASE_URL` no `.env`. O valor atual usa PostgreSQL local:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/biblioteca
```

Aplique as migracoes e inicie a API:

```bash
python manage.py migrate
python manage.py runserver
```

A API ficara disponivel em `http://127.0.0.1:8000`.

## Frontend

Em outro terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Abra `http://localhost:5173`.

Para usar a API publicada, altere o `.env`:

```env
VITE_API_URL=https://projeto-biblioteca-django-4ko3.onrender.com/api
```

## Deploy no Render

Crie um Web Service apontando para a raiz do repositorio e use:

- Build Command: `bash build.sh`
- Start Command: `gunicorn biblioteca.wsgi:application --bind 0.0.0.0:$PORT`

Configure no ambiente do Render `SECRET_KEY`, `DATABASE_URL` e `DEBUG=False`. O
`build.sh` compila o frontend e o Django serve o resultado na rota `/`; por
isso, no mesmo servico, `VITE_API_URL` pode ficar vazio ou usar `/api`.

## Funcionalidades

- Login e cadastro de usuarios com JWT.
- Dashboard com totais do acervo.
- Busca por titulo ou autor.
- Cadastro, edicao e exclusao de livros.
- Indicacao de disponibilidade.
- Layout responsivo para desktop e celular.

## Endpoints

```text
POST   /api/usuarios/cadastro/
POST   /api/token/
POST   /api/token/refresh/
GET    /api/livros/
GET    /api/livros/<id>/
POST   /api/livros/criar/
PUT    /api/livros/<id>/atualizar/
DELETE /api/livros/<id>/deletar/
```

As rotas de livros exigem o header `Authorization: Bearer <access_token>`.

## Validacao do frontend

```bash
cd frontend
npm run lint
npm run build
```
