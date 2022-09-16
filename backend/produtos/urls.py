from .views import *
from rest_framework.routers import SimpleRouter


prodrouter = SimpleRouter()
prodrouter.register('produtos', ProdutosView)