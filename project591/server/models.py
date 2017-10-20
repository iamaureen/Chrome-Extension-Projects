from django.db import models

# Create your models here.
class bookmarks(models.Model):
    username = models.CharField(max_length=25)
    url = models.TextField()
    tags = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
