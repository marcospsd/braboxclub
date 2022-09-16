from .views import *
from rest_framework.routers import SimpleRouter


vendasrouter = SimpleRouter()
vendasrouter.register('vendas', VendasView)