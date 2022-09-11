from rest_framework import serializers
from users.models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        conta = User.objects.create(
            username=self.validated_data['username'],
            first_name=(self.validated_data['first_name']).title(),
            email=self.validated_data['email'],
        )
        senha = self.validated_data['password']
        conta.set_password(senha)
        conta.save()
        return conta
