from django.urls import path
from . import views

urlpatterns = [
    path((''), views.index, name="index"),
    path(('menu/'), views.menu, name="menu"),
    path(('menu/vectores/'), views.vectores, name="vectores"),
    path(('menu/operacion/'), views.operation, name="operation"),
]