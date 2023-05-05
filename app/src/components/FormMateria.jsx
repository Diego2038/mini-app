import React, { useEffect, useState } from 'react';

function FormMateria(props) {
	const [nombre, setNombre] = useState(props.materia ? props.materia.nombre : '');
	const [profesor, setProfesor] = useState(props.materia ? props.materia.profesor : '');
	const [diaSemana, setDiaSemana] = useState(props.materia ? props.materia.dia_semana : '');
	const [horaInicio, setHoraInicio] = useState(props.materia ? props.materia.hora_inicio : '');
	const [horaFin, setHoraFin] = useState(props.materia ? props.materia.hora_fin : '');

	const handleSubmit = (event) => {
		event.preventDefault();
		let materia;
		if (props.materia) {
			materia = { id: props.materia.id, nombre, profesor, dia_semana: diaSemana, hora_inicio: horaInicio, hora_fin: horaFin };
		} else {
			materia = { nombre, profesor, dia_semana: diaSemana, hora_inicio: horaInicio, hora_fin: horaFin };
		}
		props.onSubmit(materia);
	};

	useEffect(() => {
		if (props.materia) {
			setNombre(props.materia.nombre);
			setProfesor(props.materia.profesor);
			setDiaSemana(props.materia.dia_semana);
			setHoraInicio(props.materia.hora_inicio);
			setHoraFin(props.materia.hora_fin);
		}
		else {
			setNombre('');
			setProfesor('');
			setDiaSemana('');
			setHoraInicio('');
			setHoraFin('');

		}
	}, [props.materia]);

	return (
		<div>
			<h2>{ props.materia ? "Editar materia" : "Crear materia" }</h2>
			<form onSubmit={ handleSubmit }>
				<div>
					<label htmlFor="nombre">Nombre:</label>
					<input type="text" id="nombre" value={ nombre } onChange={ (event) => setNombre(event.target.value) } />
				</div>
				<div>
					<label htmlFor="profesor">Profesor:</label>
					<input type="text" id="profesor" value={ profesor } onChange={ (event) => setProfesor(event.target.value) } />
				</div>
				<div>
					<label htmlFor="diaSemana">Día de la semana:</label>
					<input type="text" id="diaSemana" value={ diaSemana } onChange={ (event) => setDiaSemana(event.target.value) } />
				</div>
				<div>
					<label htmlFor="horaInicio">Hora de inicio:</label>
					<input type="time" id="horaInicio" value={ horaInicio } onChange={ (event) => setHoraInicio(event.target.value) } />
				</div>
				<div>
					<label htmlFor="horaFin">Hora de fin:</label>
					<input type="time" id="horaFin" value={ horaFin } onChange={ (event) => setHoraFin(event.target.value) } />
				</div>
				<button type="submit">{ props.materia ? 'Actualizar' : 'Agregar' }</button>
				<button type="button" onClick={ props.onCancel }>
					Cancelar
				</button>
			</form>
		</div>
	);
}

export default FormMateria;
