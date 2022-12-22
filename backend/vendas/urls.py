from .views import *
from django.urls import path
from rest_framework.routers import SimpleRouter


vendasrouter = SimpleRouter()
vendasrouter.register('vendas', VendasView)




urlpatterns = [
    path("resumovendas/", ResumoView.as_view()),
]

