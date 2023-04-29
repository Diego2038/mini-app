## Pasos para ejecutar el código
**Nota:** Estos pasos son sólo para Windows, si tiene otro sistema operativo el procedimiento es diferente.<br>
<br>
Para crear el ambiente virtual descarga la librería "virtualenv" a través de pip:

```
pip install virtualenv 
```

<br>
Para crear el ambiente virtual con nombre "venv":

```
python -m venv venv
```

<br>
Para ejecutar el ambiente virtual (desde la carpeta raiz):

```
.\venv\Scripts\activate
```

<br>
Realizar las instalaciones de las dependencias (procure haber ejecutado el ambiente virtual):

```
pip install -r requirements.txt
```
<br>
Para realizar las migraciones a la base de datos de postgres:

```
python manage.py makemigrations
python manage.py migrate
```
<br>
Para ejecutar el servidor Django (en modo de desarrollo):

```
python manage.py runserver
```

<br>
Para cerrar el ambiente virtual:

```
deactivate
``` 

# Consideraciones
Se debe de crear un archivo **.env** para establecer las variables de estados pertinentes, tal cual como está en el archivo **.env.example**, allí se definirán las especificaciones para la conexión con la base de datos a través de Postgres.<br><br>
En Postgres hay que crear una base de datos con el mismo nombre cómo se definió en el archivo **.env** para la variable ***NAME_DATABASE*** para que haga la conexión entre Django y la base de datos en Postgres.

