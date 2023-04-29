from django.shortcuts import render

# Create your views here.

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Estudiante, Materia, Matricula

import json

#Estudiantes

@csrf_exempt
def crear_estudiante(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        nombre = data.get('nombre') 
        edad = data.get('edad')
        correo_electronico = data.get('correo_electronico') 
        Estudiante.crear_estudiante(nombre, edad, correo_electronico)
        return JsonResponse({'status': 'OK'})
    else:
        return JsonResponse({'status': 'ERROR', 'message': 'Método HTTP no permitido'}, status=405)


@csrf_exempt
def ver_todos_los_estudiantes(request):
    if request.method == 'GET':
        estudiantes = Estudiante.ver_todos_los_estudiantes()
        data = {'estudiantes': []}
        for estudiante in estudiantes:
            data['estudiantes'].append({
                'id': estudiante.id,
                'nombre': estudiante.nombre,
                'edad': estudiante.edad,
                'correo_electronico': estudiante.correo_electronico
            })
        return JsonResponse(data)
    else:
        return JsonResponse({'status': 'ERROR', 'message': 'Método HTTP no permitido'}, status=405)


@csrf_exempt
def ver_un_estudiante(request, id_estudiante):
    if request.method == 'GET':
        try:
            estudiante = Estudiante.ver_un_estudiante(id_estudiante)
            data = {
                'id': estudiante.id,
                'nombre': estudiante.nombre,
                'edad': estudiante.edad,
                'correo_electronico': estudiante.correo_electronico
            }
            return JsonResponse(data)
        except Estudiante.DoesNotExist:
            return JsonResponse({'status': 'ERROR', 'message': 'El estudiante no existe'}, status=404)
    else:
        return JsonResponse({'status': 'ERROR', 'message': 'Método HTTP no permitido'}, status=405)


@csrf_exempt
def eliminar_estudiante(request, id_estudiante): 
    if request.method == 'DELETE':
        try:
            estudiante = Estudiante.objects.get(id=id_estudiante)
            estudiante.delete()
            return JsonResponse({'status': 'OK'})
        except Estudiante.DoesNotExist:
            return JsonResponse({'status': 'ERROR', 'message': 'Estudiante no encontrado'}, status=404)
    else:
        return JsonResponse({'status': 'ERROR', 'message': 'Método HTTP no permitido'}, status=405)


@csrf_exempt
def modificar_estudiante(request, id_estudiante):
    if request.method == 'PUT':
        try:
            estudiante = Estudiante.objects.get(id=id_estudiante)
            data = json.loads(request.body.decode('utf-8'))
            nombre = data.get('nombre', None) 
            edad = data.get('edad', None)
            correo_electronico = data.get('correo_electronico', None)

            estudiante.modificar_estudiante(nombre=nombre, edad=edad, correo_electronico=correo_electronico)
            return JsonResponse({'status': 'OK', 'estudiante': {'id': estudiante.id, 'nombre': estudiante.nombre, 'edad': estudiante.edad, 'correo_electronico': estudiante.correo_electronico}})
        except Estudiante.DoesNotExist:
            return JsonResponse({'status': 'ERROR', 'message': 'El estudiante no existe'}, status=404)
    else:
        return JsonResponse({'status': 'ERROR', 'message': 'Método HTTP no permitido'}, status=405)


# Materias

@csrf_exempt
def crear_materia(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8')) 
        nombre = data.get('nombre') 
        profesor = data.get('profesor')
        dia_semana = data.get('dia_semana')
        hora_inicio = data.get('hora_inicio')
        hora_fin = data.get('hora_fin')
        materia = Materia.crear_materia(nombre, profesor, dia_semana, hora_inicio, hora_fin)
        return JsonResponse({'status': 'OK', 'materia': {
            'nombre': materia.nombre,
            'profesor': materia.profesor,
            'dia_semana': materia.dia_semana,
            'hora_inicio': materia.hora_inicio,
            'hora_fin': materia.hora_fin
        }})
    else:
        return JsonResponse({'status': 'ERROR', 'message': 'Método HTTP no permitido'}, status=405)




