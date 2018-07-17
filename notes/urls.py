from django.urls import path

from . import views

app_name = 'notes'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('notes', views.NotesListFormView.as_view(), name='list-create'),
]
