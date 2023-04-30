import React from "react";

export const EstudianteList = ({ estudiantes, onEdit, onDelete }) => {
	return (
		<div>
			<h2>Lista de estudiantes</h2>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Nombre</th>
						<th>Edad</th>
						<th>Correo Electrónico</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{ estudiantes.map((estudiante) => (
						<tr key={ estudiante.id }>
							<td>{ estudiante.id }</td>
							<td>{ estudiante.nombre }</td>
							<td>{ estudiante.edad }</td>
							<td>{ estudiante.correo_electronico }</td>
							<td>
								<button onClick={ () => onEdit(estudiante) }>Editar</button>
								<button onClick={ () => onDelete(estudiante) }>Eliminar</button>
							</td>
						</tr>
					)) }
				</tbody>
			</table>
		</div>
	);
};