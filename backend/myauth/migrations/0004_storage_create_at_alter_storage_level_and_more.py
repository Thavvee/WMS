# Generated by Django 4.1.4 on 2023-08-09 07:06

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('myauth', '0003_storage_l1_storage_l2_storage_l3_storage_l4_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='storage',
            name='create_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='storage',
            name='level',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='storage',
            name='product',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
