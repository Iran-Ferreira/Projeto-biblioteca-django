from django.shortcuts import render

# Create your views here.


from django.http import JsonResponse

def lista_livros(request):
    livros = [
        {"id": 1, "titulo": "Dom Casmurro", "autor": "Machado de Assis"},
        {"id": 2, "titulo": "1984", "autor": "George Orwell"},
        {"id": 3, "titulo": "O Hobbit", "autor": "J.R.R. Tolkien"},
    ]
    
    return JsonResponse(livros, safe=False)