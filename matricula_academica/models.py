from django.db import models

class Estudiante(models.Model):
    nombre = models.CharField(max_length=255)
    edad = models.PositiveIntegerField()
    correo_electronico = models.EmailField()

    def __str__(self):
        return self.nombre
    
    @staticmethod
    def crear_estudiante(nombre: str, edad: int, correo_electronico: str):
        estudiante = Estudiante(nombre=nombre, edad=edad, correo_electronico=correo_electronico)
        estudiante.save()
        return estudiante
    
    def modificar_estudiante(self, nombre: str = None, edad: int = None, correo_electronico: str = None):
        if nombre!=None:
            self.nombre = nombre
        if edad!=None:
            self.edad = edad
        if correo_electronico!=None:
            self.correo_electronico = correo_electronico
        self.save()
        
    def eliminar_estudiante(self):
        self.delete()
    
    @staticmethod
    def ver_todos_los_estudiantes():
        estudiantes = Estudiante.objects.all()
        return estudiantes
    
    @staticmethod
    def ver_un_estudiante(id_estudiante: int):
        estudiante = Estudiante.objects.get(id=id_estudiante)
        return estudiante
  
class Materia(models.Model):
    nombre = models.CharField(max_length=255)
    profesor = models.CharField(max_length=255)
    dia_semana = models.CharField(max_length=255)
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()

    def __str__(self):
        return self.nombre
    
    @staticmethod
    def crear_materia(nombre: str, profesor: str, dia_semana: str, hora_inicio: str, hora_fin: str):
        materia = Materia(nombre=nombre, profesor=profesor, dia_semana=dia_semana, hora_inicio=hora_inicio, hora_fin=hora_fin)
        materia.save()
        return materia
    
    def modificar_materia(self, nombre: str, profesor: str, dia_semana: str, hora_inicio: str, hora_fin: str):
        if nombre != None:
            self.nombre = nombre
        if profesor != None:
            self.profesor = profesor
        if dia_semana != None:
            self.dia_semana = dia_semana
        if hora_inicio != None:
            self.hora_inicio = hora_inicio
        if hora_fin != None:
            self.hora_fin = hora_fin 
        self.save()
    
    def eliminar_materia(self):
        self.delete()
    
    @staticmethod
    def ver_todas_las_materias():
        materias = Materia.objects.all()
        return materias
    
    @staticmethod
    def ver_una_materia(id_materia: int):
        materia = Materia.objects.get(id=id_materia)
        return materia


class Matricula(models.Model):
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE)
    materia = models.ForeignKey(Materia, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.estudiante.nombre} matriculado en {self.materia.nombre}"
    
    @staticmethod
    def registrar_matricula(estudiante_id, materia_id):
        estudiante = Estudiante.objects.get(id=estudiante_id)
        materia = Materia.objects.get(id=materia_id)
        matricula = Matricula(estudiante=estudiante, materia=materia)
        return matricula

    @staticmethod    
    def leer_estudiantes_matriculados(materia_id):
        materia = Materia.objects.get(id=materia_id)
        estudiantes = [m.estudiante for m in materia.matricula_set.all()]
        return estudiantes
    
    def modificar_matricula(self, matricula_id, estudiante_id, materia_id):
        matricula = Matricula.objects.get(id=matricula_id)
        estudiante = Estudiante.objects.get(id=estudiante_id)
        materia = Materia.objects.get(id=materia_id)
        matricula.estudiante = estudiante
        matricula.materia = materia
        matricula.save()
    
    def eliminar_matricula(self, matricula_id):
        matricula = Matricula.objects.get(id=matricula_id)
        matricula.delete()
    
    
