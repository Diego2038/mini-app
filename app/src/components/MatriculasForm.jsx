import React, { useState } from "react";
import axios from "axios";

function MatriculasForm() {
	const [estudianteId, setEstudianteId] = useState("");
	const [materiaId, setMateriaId] = useState("");

	const handleEstudianteIdChange = (event) => {
		setEstudianteId(event.target.value);
	};

	const handleMateriaIdChange = (event) => {
		setMateriaId(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await axios.post("http://localhost:8000/crear_matricula/", {
				estudiante_id: estudianteId,
				materia_id: materiaId,
			});

			console.log(response.data);

			setEstudianteId("");
			setMateriaId("");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<h2>Crear matricula</h2>
			<form style={ { display: 'flex', flexDirection: 'column', alignItems: 'start' } } onSubmit={ handleSubmit }>
				<label>
					Estudiante ID:
					<input type="text" value={ estudianteId } onChange={ handleEstudianteIdChange } />
				</label>
				<label>
					Materia ID:
					<input type="text" value={ materiaId } onChange={ handleMateriaIdChange } />
				</label>
				<button type="submit">Crear Matrícula</button>
			</form>
		</div>
	);
}

export default MatriculasForm;
