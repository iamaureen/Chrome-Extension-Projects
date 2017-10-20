from .models import bookmarks
from rest_framework import serializers


class bookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = bookmarks
        fields = ('username', 'url', 'tags')
