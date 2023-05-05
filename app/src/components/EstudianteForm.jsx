import React, { useEffect, useState } from "react";

export const EstudianteForm = ({ onSubmit, onCancel, estudiante }) => {
	const [nombre, setNombre] = useState(estudiante.nombre);
	const [edad, setEdad] = useState(estudiante.edad);
	const [correoElectronico, setCorreoElectronico] = useState(
		estudiante.correo_electronico
	);

	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit({ id: estudiante.id, nombre, edad, correo_electronico: correoElectronico });
	};

	useEffect(() => {
		setNombre(estudiante.nombre);
		setEdad(estudiante.edad);
		setCorreoElectronico(estudiante.correo_electronico);
	}, [estudiante]);

	return (
		<div>
			<h2>{ estudiante.id ? "Editar estudiante" : "Crear estudiante" }</h2>
			<form onSubmit={ handleSubmit }>
				<div>
					<label htmlFor="nombre">Nombre:</label>
					<input
						type="text"
						id="nombre"
						value={ nombre }
						onChange={ (e) => setNombre(e.target.value) }
					/>
				</div>
				<div>
					<label htmlFor="edad">Edad:</label>
					<input
						type="number"
						id="edad"
						value={ edad }
						onChange={ (e) => setEdad(e.target.value) }
					/>
				</div>
				<div>
					<label htmlFor="correo_electronico">Correo Electrónico:</label>
					<input
						type="email"
						id="correo_electronico"
						value={ correoElectronico }
						onChange={ (e) => setCorreoElectronico(e.target.value) }
					/>
				</div>
				<button type="submit">Guardar</button>
				<button type="button" onClick={ onCancel }>
					Cancelar
				</button>
			</form>
		</div>
	);
};