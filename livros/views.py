import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
livros = [
    {"id": 1, "titulo": "Dom Casmurro", "autor": "Machado de Assis"},
    {"id": 2, "titulo": "1984", "autor": "George Orwell"},
    {"id": 3, "titulo": "O Hobbit", "autor": "J.R.R. Tolkien"},
]
@csrf_exempt
def lista_livros(request):
    return JsonResponse(livros, safe=False)

@csrf_exempt
def detalhe_livro(request, id):
    for livro in livros:
        if livro["id"] == id:
            return JsonResponse(livro)
    
    return JsonResponse({"erro": "Livro não encontrado"}, status=404)

#criação de livros
@csrf_exempt
def criar_livro(request):
    if request.method == "POST":
        data = json.loads(request.body)

        novo_livro = {
            "id": len(livros) + 1,
            "titulo": data.get("titulo"),
            "autor": data.get("autor"),
        }

        livros.append(novo_livro)

        return JsonResponse(novo_livro, status=201)
    
#Atualizar livros
@csrf_exempt
def atualizar_livro(request, id):
    if request.method == "PUT":
        data = json.loads(request.body)

        for livro in livros:
            if livro["id"] == id:
                livro["titulo"] = data.get("titulo", livro["titulo"])
                livro["autor"] = data.get("autor", livro["autor"])

                return JsonResponse(livro)

        return JsonResponse({"erro": "Livro não encontrado"}, status=404)
 
#Excluir livros
@csrf_exempt   
def deletar_livro(request, id):
    if request.method == "DELETE":
        global livros

        livros = [livro for livro in livros if livro["id"] != id]

        return JsonResponse({"mensagem": "Livro removido com sucesso"})