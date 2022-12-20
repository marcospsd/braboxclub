from rest_framework import serializers
from users.models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = ['username', 'first_name', 'password', 'id']
        fields_ready = ['id']

    def save(self):
        conta = User(
            username=self.validated_data['username'],
            first_name=self.validated_data['first_name']            
        )
        senha = self.validated_data['password']
        conta.set_password(senha)
        conta.save()
        return print(conta)
