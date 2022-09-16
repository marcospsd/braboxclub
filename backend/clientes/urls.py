from .views import *
from rest_framework.routers import SimpleRouter

clientrouter = SimpleRouter()
clientrouter.register('clientes', ClientesView)