from .views import *
from rest_framework.routers import SimpleRouter


finanrouter = SimpleRouter()
finanrouter.register('financiamento', FinanciamentoView)