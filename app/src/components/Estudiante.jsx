import React from "react";

export const Estudiante = ({ estudiante, onEdit, onDelete }) => {
	return (
		<div>
			<h2>Detalles del estudiante</h2>
			<p>
				<strong>ID:</strong> { estudiante.id }
			</p>
			<p>
				<strong>Nombre:</strong> { estudiante.nombre }
			</p>
			<p>
				<strong>Edad:</strong> { estudiante.edad }
			</p>
			<p>
				<strong>Correo Electrónico:</strong> { estudiante.correo_electronico }
			</p>
			<button onClick={ () => onEdit(estudiante) }>Editar</button>
			<button onClick={ () => onDelete(estudiante) }>Eliminar</button>
		</div>
	);
};
