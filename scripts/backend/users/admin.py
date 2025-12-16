"""Admin configuration for users."""
from django.contrib import admin
from .models import UserProfile


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'role', 'organization', 'country']
    list_filter = ['role']
    search_fields = ['user__username', 'user__email', 'organization']
