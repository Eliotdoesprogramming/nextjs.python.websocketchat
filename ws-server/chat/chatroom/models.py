from django.db import models
from django.contrib.auth.models import User, Group, Permission
# Create your models here.

class ChatRoom(models.Model):
    roomid = models.CharField(max_length=100, primary_key=True)
    users = models.ManyToManyField(User, related_name='chatrooms')
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['created_at']

class ChatMessage(models.Model):
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    chatroom = models.ForeignKey(ChatRoom, on_delete=models.CASCADE)

    def __str__(self):
        return self.message

    def last_10_messages(self):
        return ChatMessage.objects.order_by('-timestamp').all()[:10]
