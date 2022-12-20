from django.contrib.auth.forms import UserCreationForm
from .models import User
from django import forms



class UserCreateForm(UserCreationForm):
    first_name = forms.CharField(label='Nome Completo')
    username = forms.CharField(label='Username', min_length=4, max_length=150)
    password1 = forms.CharField(label='Senha', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Confirme sua Senha', widget=forms.PasswordInput)

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ["first_name", "username", "email", "password1", "password2"]