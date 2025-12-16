"""Course models for BFPA Platform."""
from django.db import models
from django.contrib.auth.models import User


class Course(models.Model):
    """Course model representing a learning track."""
    COLOR_CHOICES = [
        ('gold', 'Gold'),
        ('emerald', 'Emerald'),
        ('secondary', 'Secondary'),
    ]
    
    slug = models.SlugField(max_length=100, unique=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    icon = models.CharField(max_length=50)  # Lucide icon name
    color = models.CharField(max_length=20, choices=COLOR_CHOICES, default='gold')
    order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class Module(models.Model):
    """Module model representing a section within a course."""
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='modules')
    slug = models.SlugField(max_length=100)
    title = models.CharField(max_length=255)
    objective = models.TextField()
    order = models.PositiveIntegerField(default=0)
    capstone_task = models.TextField(blank=True, null=True)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']
        unique_together = ['course', 'slug']

    def __str__(self):
        return f"{self.course.title} - {self.title}"


class ContentSection(models.Model):
    """Content section within a module."""
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='content_sections')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class ContentPoint(models.Model):
    """Individual point within a content section."""
    section = models.ForeignKey(ContentSection, on_delete=models.CASCADE, related_name='points')
    text = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.text[:50]


class ContentExample(models.Model):
    """Example within a content section."""
    section = models.ForeignKey(ContentSection, on_delete=models.CASCADE, related_name='examples')
    text = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.text[:50]


class ReflectionQuestion(models.Model):
    """Reflection question for a module."""
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='reflection_questions')
    question = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.question[:50]


class UserProgress(models.Model):
    """Track user progress through courses."""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='progress')
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(blank=True, null=True)
    reflection_answers = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['user', 'module']

    def __str__(self):
        return f"{self.user.username} - {self.module.title}"
