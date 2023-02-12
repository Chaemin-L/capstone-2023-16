from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models


class MyUserManager(BaseUserManager):
    pass


class User(AbstractBaseUser):
    EMAIL = 'EM'
    SIGN_UP_METHOD_CHOICES = [
        (EMAIL, 'EMAIL'),
    ]
    USERNAME_FIELD = 'email'
    objects = MyUserManager()

    email = models.EmailField(verbose_name='유저의 이메일', unique=True)
    username = models.CharField(max_length=254, unique=True)
    signup_method = models.CharField(max_length=2, choices=SIGN_UP_METHOD_CHOICES, default=EMAIL)
    picture_url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='생성 시각')
    updated_at = models.DateTimeField(auto_now_add=True, verbose_name='갱신 시각')

    class Meta:
        db_table = 'users'


class EmailUser(models.Model):
    email = models.EmailField(verbose_name='유저의 이메일', unique=True)
    password = models.TextField(verbose_name='유저의 비밀번호')
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True, verbose_name='생성 시각')
    updated_at = models.DateTimeField(auto_now_add=True, verbose_name='갱신 시각')

    class Meta:
        db_table = 'email_users'
