from django.db import models


class Note(models.Model):
    text = models.TextField()
    unique_word_count = models.IntegerField()

    class Meta:
        indexes = [models.Index(fields=['-unique_word_count'])]

    def save(self, *args, **kwargs):
        unique_words = set(''.join(c for c in self.text.lower()
                                   if c.isalnum()
                                   or c.isspace()).split())
        self.unique_word_count = len(unique_words)

        super().save(*args, **kwargs)
