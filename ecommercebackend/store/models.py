# store/models.py
from django.db import models
from django.utils import timezone



class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    image = models.ImageField(upload_to='product_images/', null=True, blank=True)
    image_url = models.URLField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name

    @property
    def image_source(self):
        return self.image.url if self.image else self.image_url

class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=255)
    contact_number = models.CharField(max_length=20)
    house_number = models.CharField(max_length=255)
    road_name = models.CharField(max_length=255)
    pincode = models.CharField(max_length=10)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    nearby_place = models.CharField(max_length=255, blank=True, null=True)
    delivery_location_url = models.URLField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name
    


