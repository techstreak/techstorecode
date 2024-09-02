# store/views.py

from rest_framework import viewsets
from .models import Product, Order
from .serializers import ProductSerializer, OrderSerializer
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.generics import ListAPIView

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            
            # Send email notification
            send_mail(
                'New Order Received',
                f'Order Details:\n{serializer.data}',
                settings.EMAIL_HOST_USER,
                ['gkarthik940@gmail.com'],  # Replace with the recipient's email
                fail_silently=False,
            )

            return Response({'message': 'Form submitted successfully!'}, status=status.HTTP_201_CREATED, headers=headers)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DetailsFormView(ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
