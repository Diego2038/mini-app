import React, { useState } from 'react';

function FormMateria(props) {
	const [nombre, setNombre] = useState(props.materia ? props.materia.nombre : '');
	const [profesor, setProfesor] = useState(props.materia ? props.materia.profesor : '');
	const [diaSemana, setDiaSemana] = useState(props.materia ? props.materia.diaSemana : '');
	const [horaInicio, setHoraInicio] = useState(props.materia ? props.materia.horaInicio : '');
	const [horaFin, setHoraFin] = useState(props.materia ? props.materia.horaFin : '');

	const handleSubmit = (event) => {
		event.preventDefault();
		const materia = { nombre, profesor, diaSemana, horaInicio, horaFin };
		props.onSubmit(materia);
	};

	return (
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
		</form>
	);
}

export default FormMateria;
