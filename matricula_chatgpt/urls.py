"""
URL configuration for matricula_chatgpt project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from matricula_academica import views

urlpatterns = [
    path('admin/', admin.site.urls),
    #Estudiantes
    path('crear_estudiante/', views.crear_estudiante, name='crear_estudiante'),
    path('leer_estudiantes/', views.ver_todos_los_estudiantes , name='leer_estudiantes'),
    path('leer_estudiantes/<int:id_estudiante>/', views.ver_un_estudiante, name='leer_estudiante'),
    path('eliminar_estudiante/<int:id_estudiante>/', views.eliminar_estudiante, name='eliminar_estudiante'),
    path('modificar_estudiante/<int:id_estudiante>/', views.modificar_estudiante, name='modificar_estudiante'),
    # Materias
    path('crear_materia/', views.crear_materia, name='crear_materia'),
    path('modificar_materia/<int:id_materia>/', views.actualizar_materia, name='modificar_materia'),
    path('eliminar_materia/<int:id_materia>/', views.eliminar_materia, name='eliminar_materia'),
    path('leer_materias/', views.ver_todas_las_materias, name='leer_materias'),
    path('leer_materias/<int:id_materia>/', views.ver_materia, name='leer_materia'),
    # Matricula
    path('crear_matricula/', views.registrar_matricula, name='crear_matricula'),
]
