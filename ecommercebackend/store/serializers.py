# store/serializers.py
from rest_framework import serializers
from .models import Product, Order

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = [
            'product', 'quantity', 'created_at',
            'name', 'contact_number', 'house_number', 
            'road_name', 'pincode', 'city', 'state', 
            'nearby_place', 'delivery_location_url'
        ]




        