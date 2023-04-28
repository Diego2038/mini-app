from django.shortcuts import render

# Create your views here.

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Estudiante

import json

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




