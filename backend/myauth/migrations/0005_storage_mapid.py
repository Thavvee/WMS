# Generated by Django 4.1.4 on 2023-08-10 07:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myauth', '0004_storage_create_at_alter_storage_level_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='storage',
            name='mapid',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]