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


@csrf_exempt
def actualizar_materia(request, id_materia):
    try:
        materia = Materia.objects.get(id=id_materia)
    except Materia.DoesNotExist:
        return JsonResponse({'status': 'ERROR', 'message': 'La materia no existe'}, status=404)

    if request.method == 'PUT':  
        #nombre = data.get('nombre') 
        data = json.loads(request.body.decode('utf-8'))
        nombre = data.get('nombre',None)
        profesor = data.get('profesor',None)
        dia_semana = data.get('dia_semana',None)
        hora_inicio = data.get('hora_inicio',None)
        hora_fin = data.get('hora_fin',None)

        materia.modificar_materia(
            nombre = nombre,
            profesor = profesor,
            dia_semana = dia_semana,
            hora_inicio = hora_inicio,
            hora_fin = hora_fin   
        )

        materia.save()
        return JsonResponse({
            'status': 'OK',
            'materia': {
                'nombre': materia.nombre,
                'profesor': materia.profesor,
                'dia_semana': materia.dia_semana,
                'hora_inicio': materia.hora_inicio,
                'hora_fin': materia.hora_fin
            }
        })
    else:
        return JsonResponse({'status': 'ERROR', 'message': 'Método HTTP no permitido'}, status=405)


@csrf_exempt
def eliminar_materia(request, id_materia): 
    if request.method == 'DELETE':
        try:
            materia = Materia.objects.get(id=id_materia)
            materia.eliminar_materia()
            return JsonResponse({'status': 'OK'})
        except Estudiante.DoesNotExist:
            return JsonResponse({'status': 'ERROR', 'message': 'Materia no encontrada'}, status=404)
    else:
        return JsonResponse({'status': 'ERROR', 'message': 'Método HTTP no permitido'}, status=405)


@csrf_exempt
def ver_todas_las_materias(request):
    if request.method == 'GET':
        materias = Materia.ver_todas_las_materias()
        data = {'materias': list(materias.values('id', 'nombre', 'profesor', 'dia_semana', 'hora_inicio', 'hora_fin'))}
        return JsonResponse(data, safe=False)
    else:
        return JsonResponse({'status': 'ERROR', 'message': 'Método HTTP no permitido'}, status=405)


@csrf_exempt
def ver_materia(request, id_materia):
    if request.method == 'GET':
        try:
            materia = Materia.ver_una_materia(id_materia)
            return JsonResponse({
                'nombre': materia.nombre,
                'profesor': materia.profesor,
                'dia_semana': materia.dia_semana,
                'hora_inicio': str(materia.hora_inicio),
                'hora_fin': str(materia.hora_fin)
            })
        except Materia.DoesNotExist:
            return JsonResponse({'status': 'ERROR', 'message': 'Materia no encontrada'}, status=404)
    else:
        return JsonResponse({'status': 'ERROR', 'message': 'Método HTTP no permitido'}, status=405)

# Matricula
@csrf_exempt
def registrar_matricula(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            estudiante_id = data.get('estudiante_id')
            materia_id = data.get('materia_id')
            matricula = Matricula.registrar_matricula(estudiante_id, materia_id)
            matricula.save()
            return JsonResponse({'status': 'OK'})
        except Estudiante.DoesNotExist:
            return JsonResponse({'status': 'ERROR', 'message': 'Estudiante no encontrado'}, status=404)
        except Materia.DoesNotExist:
            return JsonResponse({'status': 'ERROR', 'message': 'Materia no encontrada'}, status=404)
    else:
        return JsonResponse({'status': 'ERROR', 'message': 'Método HTTP no permitido'}, status=405)
    

@csrf_exempt
def obtener_estudiantes_matriculados(request, materia_id):
    if request.method == 'GET':
        try:
            estudiantes = Matricula.leer_estudiantes_matriculados(materia_id)
            estudiantes_info = [{'nombre': estudiante.nombre, 'edad': estudiante.edad, 'correo_electronico': estudiante.correo_electronico} for estudiante in estudiantes]
            return JsonResponse({'estudiantes': estudiantes_info})
        except:
            return JsonResponse({'status': 'ERROR', 'message': 'Materia no encontrada'}, status=404)
    else:
        return JsonResponse({'status': 'ERROR', 'message': 'Método HTTP no permitido'}, status=405)
    

@csrf_exempt
def eliminar_matricula(request, matricula_id):
    if request.method == 'DELETE':
        try:
            matricula = Matricula.objects.get(id=matricula_id)
            matricula.eliminar_matricula(matricula_id)
            return JsonResponse({'status': 'OK'})
        except Matricula.DoesNotExist:
            return JsonResponse({'status': 'ERROR', 'message': 'Matricula no encontrada'}, status=404)
    else:
        return JsonResponse({'status': 'ERROR', 'message': 'Método HTTP no permitido'}, status=405)


@csrf_exempt
def modificar_matricula(request, matricula_id):
    if request.method == 'PUT':
        data = json.loads(request.body)
        estudiante_id = data.get('estudiante_id')
        materia_id = data.get('materia_id')
        try:
            matricula = Matricula.objects.get(id=matricula_id)
            estudiante = Estudiante.objects.get(id=estudiante_id)
            materia = Materia.objects.get(id=materia_id) 
            matricula.modificar_matricula(estudiante=estudiante,materia=materia)
            return JsonResponse({'status': 'OK'})
        except Matricula.DoesNotExist:
            return JsonResponse({'status': 'ERROR', 'message': 'Matricula no encontrada'}, status=404)
        except Estudiante.DoesNotExist:
            return JsonResponse({'status': 'ERROR', 'message': 'Estudiante no encontrado'}, status=404)
        except Materia.DoesNotExist:
            return JsonResponse({'status': 'ERROR', 'message': 'Materia no encontrada'}, status=404)
        except Exception as e:
            return JsonResponse({'status': 'ERROR', 'message': str(e)}, status=400)
    else:
        return JsonResponse({'status': 'ERROR', 'message': 'Método HTTP no permitido'}, status=405)


@csrf_exempt
def ver_materias_matriculadas(request, estudiante_id):
    if request.method == 'GET':
        try:
            estudiante = Estudiante.objects.get(id=estudiante_id)
            materias = Matricula.ver_materias_matriculadas(estudiante_id)
            response = {
                'nombre': estudiante.nombre,
                'materias_matriculadas': [materia.nombre for materia in materias]}
            return JsonResponse(response, status=200)
        except Estudiante.DoesNotExist:
           return JsonResponse({'status': 'ERROR', 'message': 'Estudiante no encontrado'}, status=404) 
    else:
        return JsonResponse({'status': 'ERROR', 'message': 'Método HTTP no permitido'}, status=405)