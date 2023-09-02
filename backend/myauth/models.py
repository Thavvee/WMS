# myapp/models.py
from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class User(models.Model):
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    roles = models.ManyToManyField(Role)

    def __str__(self):
        return self.username
    
class storage(models.Model):
    create_at = models.DateTimeField(auto_now_add=True)
    warehouse = models.CharField(max_length=100)
    zone = models.CharField(max_length=100, )
    col = models.CharField(max_length=100)
    row = models.CharField(max_length=100)
    # x = models.CharField(max_length=100)
    level = models.CharField(max_length=100,null=True, blank=True)
    product = models.CharField(max_length=100,null=True, blank=True)
    l1 = models.CharField(max_length=100, null=True, blank=True)
    l2 = models.CharField(max_length=100, null=True, blank=True)
    l3 = models.CharField(max_length=100, null=True, blank=True)
    l4 = models.CharField(max_length=100, null=True, blank=True)
    l5 = models.CharField(max_length=100, null=True, blank=True)
    mapid = models.CharField(max_length=200, blank=True, null=True)
    # l1_lock = models.BooleanField(default=False)  # False represents 'unlock'
    # l1_lab = models.BooleanField(default=False)
    # l2_lock = models.BooleanField(default=False)  # False represents 'unlock'
    # l2_lab = models.BooleanField(default=False)
    # l3_lock = models.BooleanField(default=False)  # False represents 'unlock'
    # l3_lab = models.BooleanField(default=False)
    # l4_lock = models.BooleanField(default=False)  # False represents 'unlock'
    # l4_lab = models.BooleanField(default=False)
    # l5_lock = models.BooleanField(default=False)  # False represents 'unlock'
    # l5_lab = models.BooleanField(default=False)


    def save(self, *args, **kwargs):
        self.mapid = f"{self.col}{self.row}"
        super(storage, self).save(*args, **kwargs)


    # @property
    # def mapid(self):
    #     return f"{self.col}{self.row}"
    

class Warehouse(models.Model):
    name = models.CharField(max_length=255)

# รายละเอียดบริเวณภายในคลัง
class Zone(models.Model):
    name = models.CharField(max_length=255)
    warehouse = models.ForeignKey(Warehouse, related_name='zones', on_delete=models.CASCADE)

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    # lab = models.BooleanField(default=False)
    # lock = models.BooleanField(default=False)
# รายละเอียดแต่ละสถานที่ในคลังสินค้า
class Storage_info(models.Model):
    created_at = models.DateTimeField(auto_now_add=True,null=True)
    zone = models.ForeignKey(Zone, related_name='storages', on_delete=models.CASCADE)
    row = models.IntegerField()
    column = models.IntegerField()
    mapid = models.CharField(max_length=200, blank=True, null=True)
    level = models.IntegerField()
    product = models.ForeignKey(Product, related_name='storages', on_delete=models.SET_NULL, null=True, blank=True)
    lab = models.BooleanField(default=False)
    lock = models.BooleanField(default=False)
    




@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


