import React from 'react';

function TablaMaterias(props) {
	const { materias, onEditar, onEliminar } = props;

	return (
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>Nombre</th>
					<th>Profesor</th>
					<th>Día de la semana</th>
					<th>Hora de inicio</th>
					<th>Hora de fin</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				{ materias.map((materia) => (
					<tr key={ materia.id }>
						<td>{ materia.id }</td>
						<td>{ materia.nombre }</td>
						<td>{ materia.profesor }</td>
						<td>{ materia.dia_semana }</td>
						<td>{ materia.hora_inicio }</td>
						<td>{ materia.hora_fin }</td>
						<td>
							<button onClick={ () => onEditar(materia) }>Editar</button>
							<button onClick={ () => onEliminar(materia.id) }>Eliminar</button>
						</td>
					</tr>
				)) }
			</tbody>
		</table>
	);
}

export default TablaMaterias;
