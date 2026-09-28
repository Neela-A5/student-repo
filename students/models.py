from django.db import models
from django.core.validators import MinValueValidator


class Student(models.Model):

    name = models.CharField(
        max_length=100
    )

    email = models.EmailField(
        unique=True
    )

    course = models.CharField(
        max_length=100
    )

    age = models.PositiveIntegerField(
        validators=[MinValueValidator(1)]
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        db_table = 'students'
        ordering = ['-created_at']

    def __str__(self):
        return self.name