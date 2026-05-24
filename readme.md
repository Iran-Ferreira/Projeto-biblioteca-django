
# Biblioteca Online API (Django)

Este projeto é uma API simples desenvolvida com o Django que simula uma biblioteca online.

Nesta primeira versão, a API retorna uma lista fixa de livros em formato JSON, sem uso de banco de dados.

## Rode o projeto localmente

Clone o projeto

```bash
  git clone https://link-to-project
```

Criar e ativar ambiente virtual

```bash
  python3.12 -m venv venv
```

```bash
  source venv/bin/activate
```


Instalar dependências

```bash
  pip install -r requirements.txt
```

Aplicar migrações

```bash
  python manage.py migrate
```

Rodar o servidor
```bash
  python manage.py runserver
```

Acesse no navegador
```bash
http://127.0.0.1:8000/
```

## Atualizações no código: 
- JWT (JSON Web Token) para autenticação baseada em tokens.
- Cadastro de usuários (ex.: clientes, administradores).
- Login (geração de token JWT).
- Proteção de rotas (permitir acesso apenas para usuários autenticados).

## Rotas para testar o projeto localmente

Listar livros (dados estáticos)

    Endpoint: GET /api/livros/
    URL completa: http://127.0.0.1:8000/api/livros/

Listar livro único

    Endpoint: GET /api/livros/1/
    URL completa: http://127.0.0.1:8000/api/livros/1/

Criar livros

    Endpoint: POST api/livros/criar/
    URL completa: http://127.0.0.1:8000/api/livros/criar/

Deletar livros

    Endpoint: DELETE api/livros/1 deletar/
    URL completa: http://127.0.0.1:8000/api/livros/1/deletar/

Atualizar livros

    Endpoint: PUT api/livros/1/atualizar/
    URL completa: http://127.0.0.1:8000/api/livros/1/atualizar/


## Rotas para testar o projeto no render

Listar livros

    Endpoint: GET /api/livros/
    URL completa: https://projeto-biblioteca-django-4ko3.onrender.com/api/livros/

Listar livro único

    Endpoint: GET /api/livros/1/
    URL completa: https://projeto-biblioteca-django-4ko3.onrender.com/api/livros/1/

Criar usuários

    Endpoint: POST api/usuarios/cadastro/
    URL completa: https://projeto-biblioteca-django-4ko3.onrender.com/api/usuarios/cadastro/
    
    
Criar token JWT

    Endpoint: POST api/token/
    URL completa: https://projeto-biblioteca-django-4ko3.onrender.com/api/token/


Criar livros

    Endpoint: POST api/livros/criar/
    URL completa: https://projeto-biblioteca-django-4ko3.onrender.com/api/livros/criar/

Deletar livros

    Endpoint: DELETE api/livros/1/deletar/
    URL completa: https://projeto-biblioteca-django-4ko3.onrender.com/api/livros/3/deletar/

Atualizar livros

    Endpoint: PUT api/livros/1/atualizar/
    URL completa: https://projeto-biblioteca-django-4ko3.onrender.com/api/livros/1/atualizar/
