# Generated by Django 3.2.4 on 2021-07-31 07:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0010_auto_20210730_0814'),
    ]

    operations = [
        migrations.AlterField(
            model_name='income',
            name='from_whom',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='income_from_whom', to='base.member'),
        ),
    ]
