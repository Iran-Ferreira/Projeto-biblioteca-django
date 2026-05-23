from django.db import models

class Livro(models.Model):

    titulo = models.CharField(max_length=200)

    autor = models.CharField(max_length=100)

    descricao = models.TextField(blank=True)

    ano_publicacao = models.IntegerField()

    disponivel = models.BooleanField(default=True)

    criado_em = models.DateTimeField(auto_now_add=True)

    atualizado_em = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.titulo
