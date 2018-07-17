from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response

from . serializers import NoteSerializer
from .models import Note


class NotesListFormView(ListCreateAPIView):
    serializer_class = NoteSerializer
    queryset = Note.objects.order_by('-unique_word_count')


class IndexView(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'notes/index.html'

    def get(self, request):
        return Response()
