from django.urls import path
from .views import (
    lista_livros,
    detalhe_livro,
    criar_livro,
    atualizar_livro,
    deletar_livro
)
urlpatterns = [
    path('livros/', lista_livros),
    path('livros/', lista_livros),
    path('livros/<int:id>/', detalhe_livro),
    path('livros/criar/', criar_livro),
    path('livros/<int:id>/atualizar/', atualizar_livro),
    path('livros/<int:id>/deletar/', deletar_livro),
]