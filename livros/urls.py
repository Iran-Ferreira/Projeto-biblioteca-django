from django.urls import path
from .views import lista_livros

urlpatterns = [
    path('livros/', lista_livros),
]