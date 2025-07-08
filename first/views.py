from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'index.html', {
        'title': 'Matematica',
        'message': 'Welcome to the Matematica app!'
    })

def menu(request):
    return render(request, 'menu.html', {
        'title': 'Menu',
        'message': 'Select a topic to explore!'
    })

def vectores(request):
    return render(request, 'vectores_1/vectores_first.html')

def operation(request):
    return render(request, 'vectores_1/operation.html')

def escalar(request):
    return render(request, 'vectores_1/escalar.html')

def producto(request):
    return render(request, 'vectores_1/productoCruz.html')