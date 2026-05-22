from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def rota_protegida(request):

    return Response({
        "mensagem": "Usuário autenticado com sucesso"
    })

# Create your views here.
livros = [
    {"id": 1, "titulo": "Dom Casmurro", "autor": "Machado de Assis"},
    {"id": 2, "titulo": "1984", "autor": "George Orwell"},
    {"id": 3, "titulo": "O Hobbit", "autor": "J.R.R. Tolkien"},
]

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def lista_livros(request):
    return Response(livros)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def detalhe_livro(request, id):
    
    for livro in livros:
        if livro["id"] == id:
            return Response(livro)
    
    return Response({"erro": "Livro não encontrado"}, status=404)

#criação de livros
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def criar_livro(request):

    novo_livro = {
        "id": len(livros) + 1,
        "titulo": request.data.get("titulo"),
        "autor": request.data.get("autor"),
    }

    livros.append(novo_livro)

    return Response(novo_livro, status=201)
    
#Atualizar livros
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def atualizar_livro(request, id):

    for livro in livros:
        if livro["id"] == id:
            livro["titulo"] = request.data.get("titulo", livro["titulo"])
            livro["autor"] = request.data.get("autor", livro["autor"])

            return Response(livro)

    return Response({"erro": "Livro não encontrado"}, status=404)
 
#Excluir livros
@api_view(['DELETE']) 
@permission_classes([IsAuthenticated]) 
def deletar_livro(request, id):
    global livros

    livros = [
        livro for livro in livros 
            if livro["id"] != id
        ]

    return Response({"mensagem": "Livro removido com sucesso"})