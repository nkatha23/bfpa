"""URL configuration for courses API."""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, ModuleViewSet, UserProgressViewSet

router = DefaultRouter()
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'progress', UserProgressViewSet, basename='progress')

urlpatterns = [
    path('', include(router.urls)),
    path('courses/<slug:course_slug>/modules/', 
         ModuleViewSet.as_view({'get': 'list'}), 
         name='module-list'),
    path('courses/<slug:course_slug>/modules/<slug:pk>/', 
         ModuleViewSet.as_view({'get': 'retrieve'}), 
         name='module-detail'),
]
