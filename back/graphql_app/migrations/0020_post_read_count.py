# Generated by Django 4.1.5 on 2023-03-15 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('graphql_app', '0019_persona_following_personas'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='read_count',
            field=models.IntegerField(blank=True, default=0, verbose_name='조회수'),
        ),
    ]
