"""Views for course API."""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from django.utils import timezone
from .models import Course, Module, UserProgress
from .serializers import (
    CourseListSerializer, CourseDetailSerializer,
    ModuleListSerializer, ModuleDetailSerializer,
    UserProgressSerializer
)


class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for courses."""
    queryset = Course.objects.filter(is_published=True)
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return CourseDetailSerializer
        return CourseListSerializer

    def get_object(self):
        """Allow lookup by slug."""
        queryset = self.get_queryset()
        slug = self.kwargs.get('pk')
        return get_object_or_404(queryset, slug=slug)


class ModuleViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for modules."""
    permission_classes = [AllowAny]

    def get_queryset(self):
        course_slug = self.kwargs.get('course_slug')
        return Module.objects.filter(
            course__slug=course_slug,
            is_published=True
        )

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ModuleDetailSerializer
        return ModuleListSerializer

    def get_object(self):
        """Allow lookup by slug."""
        queryset = self.get_queryset()
        slug = self.kwargs.get('pk')
        return get_object_or_404(queryset, slug=slug)


class UserProgressViewSet(viewsets.ModelViewSet):
    """ViewSet for user progress tracking."""
    serializer_class = UserProgressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserProgress.objects.filter(user=self.request.user)

    @action(detail=False, methods=['get'])
    def course_progress(self, request):
        """Get progress for a specific course."""
        course_slug = request.query_params.get('course')
        if not course_slug:
            return Response({'error': 'course parameter required'}, status=400)
        
        progress = self.get_queryset().filter(module__course__slug=course_slug)
        serializer = self.get_serializer(progress, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def complete_module(self, request):
        """Mark a module as complete."""
        course_slug = request.data.get('course_slug')
        module_slug = request.data.get('module_slug')
        reflection_answers = request.data.get('reflection_answers', {})

        module = get_object_or_404(
            Module, 
            course__slug=course_slug, 
            slug=module_slug
        )

        progress, created = UserProgress.objects.get_or_create(
            user=request.user,
            module=module
        )
        progress.completed = True
        progress.completed_at = timezone.now()
        progress.reflection_answers = reflection_answers
        progress.save()

        serializer = self.get_serializer(progress)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def is_module_unlocked(self, request):
        """Check if a module is unlocked for the user."""
        course_slug = request.query_params.get('course')
        module_slug = request.query_params.get('module')

        if not course_slug or not module_slug:
            return Response({'error': 'course and module parameters required'}, status=400)

        module = get_object_or_404(Module, course__slug=course_slug, slug=module_slug)
        
        # First module is always unlocked
        if module.order == 0:
            return Response({'unlocked': True})

        # Check if previous module is completed
        previous_module = Module.objects.filter(
            course__slug=course_slug,
            order=module.order - 1
        ).first()

        if not previous_module:
            return Response({'unlocked': True})

        completed = UserProgress.objects.filter(
            user=request.user,
            module=previous_module,
            completed=True
        ).exists()

        return Response({'unlocked': completed})
