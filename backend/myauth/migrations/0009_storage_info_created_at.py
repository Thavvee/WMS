# Generated by Django 4.1.4 on 2023-08-30 08:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myauth', '0008_storage_info_mapid'),
    ]

    operations = [
        migrations.AddField(
            model_name='storage_info',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
