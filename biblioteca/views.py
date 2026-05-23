from django.http import JsonResponse

def home(request):
    return JsonResponse({
        "mensagem": "API Biblioteca Online funcionando"
    })