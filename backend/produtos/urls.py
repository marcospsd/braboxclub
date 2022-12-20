from .views import *
from rest_framework.routers import SimpleRouter
from django.urls import path

prodrouter = SimpleRouter()
prodrouter.register('produtos', ProdutosView)

urlpatterns = [
    path('produtos/<desc_pk>', ProdutoSearchView.as_view(), name='desc_pk'),
]