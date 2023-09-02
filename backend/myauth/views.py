from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view

from rest_framework import routers, serializers, viewsets
from .models import *
from rest_framework.views import APIView
from .serializer import *
from rest_framework.response import Response
from rest_framework_bulk import BulkModelViewSet


from rest_framework.response import Response
from django.http import JsonResponse
from myauth.serializer import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
import json
from django.db.models import OuterRef, Subquery,F


# Create your views here.


class storage_ApiView(viewsets.ModelViewSet):
    latest_create_at = storage.objects.filter(mapid=OuterRef('mapid')).order_by('-create_at').values('create_at')[:1]


    queryset = (storage.objects
            .annotate(latest_date=Subquery(latest_create_at))
            .filter(create_at=F('latest_date'))
            .order_by('mapid'))

    serializer_class = storage_serializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer



class storage_info_ApiView(viewsets.ModelViewSet):
    # latest_create_at = Storage_info.objects.filter(mapid=OuterRef('mapid')).order_by('-created_at').values('created_at')[:1]
    queryset = Storage_info.objects.order_by('-created_at')

    # queryset = (Storage_info.objects
    #         .annotate(latest_date=Subquery(latest_create_at))
    #         .filter(create_at=F('latest_date'))
    #         .order_by('mapid'))

    serializer_class = storage_info_serializer

class storage_info_bulk(BulkModelViewSet):
    # latest_create_at = Storage_info.objects.filter(mapid=OuterRef('mapid')).order_by('-created_at').values('created_at')[:1]
    queryset = Storage_info.objects.all()

    # queryset = (Storage_info.objects
    #         .annotate(latest_date=Subquery(latest_create_at))
    #         .filter(create_at=F('latest_date'))
    #         .order_by('mapid'))

    serializer_class = storage_info_serializer




class allstorage_ApiView(viewsets.ModelViewSet):
    queryset = storage.objects.all().order_by('-create_at')
    serializer_class = storage_serializer


router = routers.DefaultRouter()
router.register(r'storage_info',storage_info_ApiView)
router.register(r'allstorage',allstorage_ApiView)
router.register(r'storage',storage_ApiView)
router.register(r'storage_info_bulk',storage_info_bulk)
router.register(r'products', ProductViewSet)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/test/'
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        try:
            body = request.body.decode('utf-8')
            data = json.loads(body)
            if 'text' not in data:
                return Response("Invalid JSON data", status.HTTP_400_BAD_REQUEST)
            text = data.get('text')
            data = f'Congratulation your API just responded to POST request with text: {text}'
            return Response({'response': data}, status=status.HTTP_200_OK)
        except json.JSONDecodeError:
            return Response("Invalid JSON data", status.HTTP_400_BAD_REQUEST)
    return Response("Invalid JSON data", status.HTTP_400_BAD_REQUEST)