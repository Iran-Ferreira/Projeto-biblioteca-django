from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework import status

from .models import Livro
from .serializers import LivroSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def rota_protegida(request):

    return Response({
        "mensagem": "Usuário autenticado com sucesso"
    })

# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def lista_livros(request):
    livros = Livro.objects.all()
    serializer = LivroSerializer(
        livros,
        many=True
    )
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def detalhe_livro(request, id): 
    try: 
        livro = Livro.objects.get(id=id)
        
        serializer = LivroSerializer(livro)

        return Response(serializer.data)
    except Livro.DoesNotExist:
        return Response(
            {"erro:" "Livro não encontrado"},
            status=status.HTTP_404_NOT_FOUND
        )
#criação de livros
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def criar_livro(request):
    serializer = LivroSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )
    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )
    
#Atualizar livros
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def atualizar_livro(request, id):
    try: 
        livro = Livro.objects.get(id=id)

    except Livro.DoesNotExist:
        return Response(
            {"erro:" "Livro não encontrado"},
            status=status.HTTP_404_NOT_FOUND
        )
    
    serializer = LivroSerializer(
        livro,
        data=request.data,
        partial=True
    )
    
    if serializer.is_valid():
        serializer.save()
        
        return Response(serializer.data)
    
    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )
 
#Excluir livros
@api_view(['DELETE']) 
@permission_classes([IsAuthenticated]) 
def deletar_livro(request, id):
    try:
        livro = Livro.objects.get(id=id)
    
    except Livro.DoesNotExist:
        return Response(
            {"erro:" "Livro não encontrado"},
            status=status.HTTP_404_NOT_FOUND
        )
    
    livro.delete()
    
    return Response({
        "Mensagem:" "Livro removido com sucesso."
    })