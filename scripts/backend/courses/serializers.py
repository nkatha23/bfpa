"""Serializers for course API."""
from rest_framework import serializers
from .models import (
    Course, Module, ContentSection, ContentPoint, 
    ContentExample, ReflectionQuestion, UserProgress
)


class ContentPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentPoint
        fields = ['id', 'text', 'order']


class ContentExampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentExample
        fields = ['id', 'text', 'order']


class ContentSectionSerializer(serializers.ModelSerializer):
    points = ContentPointSerializer(many=True, read_only=True)
    examples = ContentExampleSerializer(many=True, read_only=True)

    class Meta:
        model = ContentSection
        fields = ['id', 'title', 'description', 'order', 'points', 'examples']


class ReflectionQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReflectionQuestion
        fields = ['id', 'question', 'order']


class ModuleListSerializer(serializers.ModelSerializer):
    """Lightweight module serializer for list views."""
    class Meta:
        model = Module
        fields = ['id', 'slug', 'title', 'objective', 'order', 'capstone_task']


class ModuleDetailSerializer(serializers.ModelSerializer):
    """Full module serializer with content."""
    content_sections = ContentSectionSerializer(many=True, read_only=True)
    reflection_questions = ReflectionQuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Module
        fields = [
            'id', 'slug', 'title', 'objective', 'order', 
            'capstone_task', 'content_sections', 'reflection_questions'
        ]


class CourseListSerializer(serializers.ModelSerializer):
    """Lightweight course serializer for list views."""
    module_count = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'slug', 'title', 'description', 'icon', 'color', 'module_count']

    def get_module_count(self, obj):
        return obj.modules.filter(is_published=True).count()


class CourseDetailSerializer(serializers.ModelSerializer):
    """Full course serializer with modules."""
    modules = ModuleListSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'slug', 'title', 'description', 'icon', 'color', 'modules']


class UserProgressSerializer(serializers.ModelSerializer):
    module_slug = serializers.CharField(source='module.slug', read_only=True)
    course_slug = serializers.CharField(source='module.course.slug', read_only=True)

    class Meta:
        model = UserProgress
        fields = ['id', 'module_slug', 'course_slug', 'completed', 'completed_at', 'reflection_answers']
