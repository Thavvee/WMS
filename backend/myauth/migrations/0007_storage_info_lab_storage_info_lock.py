# Generated by Django 4.1.4 on 2023-08-30 08:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myauth', '0006_product_warehouse_zone_storage_info'),
    ]

    operations = [
        migrations.AddField(
            model_name='storage_info',
            name='lab',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='storage_info',
            name='lock',
            field=models.BooleanField(default=False),
        ),
    ]
