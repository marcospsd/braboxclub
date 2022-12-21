from .views import *
from rest_framework.routers import SimpleRouter
from django.urls import path

clientrouter = SimpleRouter()
clientrouter.register('clientes', ClientesView)


urlpatterns = [
    path('clientesearch/<nome_pk>', ClientesSearchView.as_view(), name='nome_pk'),
]