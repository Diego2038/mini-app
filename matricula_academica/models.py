from django.db import models

class Estudiante(models.Model):
    nombre = models.CharField(max_length=255)
    edad = models.PositiveIntegerField()
    correo_electronico = models.EmailField()

    def __str__(self):
        return self.nombre
  
class Materia(models.Model):
    nombre = models.CharField(max_length=255)
    profesor = models.CharField(max_length=255)
    dia_semana = models.CharField(max_length=255)
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()

    def __str__(self):
        return self.nombre

class Matricula(models.Model):
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE)
    materia = models.ForeignKey(Materia, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.estudiante.nombre} matriculado en {self.materia.nombre}"
