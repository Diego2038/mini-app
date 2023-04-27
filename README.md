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
Realizar las instalaciones de las dependencias:

```
pip install -r requirements.txt
```


<br>
Para cerrar el ambiente virtual:

```
deactivate
``` 

# Consideraciones
En Postgres hay que crear una base de datos llamada "prueba_chatgpt" para que haga la conexión entre Django y la base de datos en Postgres

