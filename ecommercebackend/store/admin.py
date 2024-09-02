from django.contrib import admin
from .models import  Product, Order 

# Register your models here.

admin.site.register(Product)
admin.site.register(Order)


class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'stock', 'image', 'image_url']

class OrderAdmin(admin.ModelAdmin):
    list_display = ['product', 'quantity', 'created_at', 'name', 'contact_number', 'house_number', 'road_name', 'pincode', 'city', 'state', 'nearby_place', 'delivery_location_url']



