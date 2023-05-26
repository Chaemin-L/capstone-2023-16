# Generated by Django 4.1.5 on 2023-04-12 23:39

from django.db import migrations
import django_choices_field.fields
import graphql_app.models


class Migration(migrations.Migration):

    dependencies = [
        ('graphql_app', '0041_alter_challengeobjective_duration_type_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='challengeobjective',
            name='duration_type',
            field=django_choices_field.fields.TextChoicesField(choices=[('monthly', '매달'), ('daily', '매일'), ('weekly', '매주')], choices_enum=graphql_app.models.ChallengeObjective.DurationType, max_length=7),
        ),
        migrations.AlterField(
            model_name='challengeobjective',
            name='kind',
            field=django_choices_field.fields.TextChoicesField(choices=[('individual', '개인'), ('group', '공동')], choices_enum=graphql_app.models.ChallengeObjective.ParticipateKind, max_length=10),
        ),
    ]
