
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

Listar livros (dados estáticos)

    Endpoint: GET /api/livros/
    URL completa: http://127.0.0.1:8000/api/livros/