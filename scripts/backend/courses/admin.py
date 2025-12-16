"""Admin configuration for courses."""
from django.contrib import admin
from .models import (
    Course, Module, ContentSection, ContentPoint, 
    ContentExample, ReflectionQuestion, UserProgress
)


class ContentPointInline(admin.TabularInline):
    model = ContentPoint
    extra = 1


class ContentExampleInline(admin.TabularInline):
    model = ContentExample
    extra = 1


class ContentSectionInline(admin.TabularInline):
    model = ContentSection
    extra = 1
    show_change_link = True


class ReflectionQuestionInline(admin.TabularInline):
    model = ReflectionQuestion
    extra = 1


class ModuleInline(admin.TabularInline):
    model = Module
    extra = 1
    show_change_link = True


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'color', 'order', 'is_published']
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ModuleInline]


@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    list_display = ['title', 'course', 'order', 'is_published']
    list_filter = ['course', 'is_published']
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ContentSectionInline, ReflectionQuestionInline]


@admin.register(ContentSection)
class ContentSectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'module', 'order']
    list_filter = ['module__course']
    inlines = [ContentPointInline, ContentExampleInline]


@admin.register(UserProgress)
class UserProgressAdmin(admin.ModelAdmin):
    list_display = ['user', 'module', 'completed', 'completed_at']
    list_filter = ['completed', 'module__course']
