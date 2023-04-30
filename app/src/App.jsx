import React, { useState, useEffect } from "react";
import axios from 'axios';
import { EstudianteForm } from "./components/EstudianteForm";
import { EstudianteList } from "./components/EstudianteList";
import { Estudiante } from "./components/Estudiante";

const BASE_URL = "http://localhost:8000";

export const App = () => {
	const [estudiantes, setEstudiantes] = useState([]);
	const [estudianteActual, setEstudianteActual] = useState(null);

	useEffect(() => {
		axios.get(`${BASE_URL}/leer_estudiantes/`).then((response) => {
			console.log(response.data.estudiantes);
			setEstudiantes(response.data.estudiantes);
		});
	}, []);

	const handleCreate = (estudiante) => {
		axios.post(`${BASE_URL}/crear_estudiante/`, estudiante).then((response) => {
			setEstudiantes([...estudiantes, response.data]);
			setEstudianteActual(null);
		});
	};

	const handleUpdate = (estudiante) => {
		axios
			.put(`${BASE_URL}/modificar_estudiante/${estudiante.id}/`, estudiante)
			.then(() => {
				const updatedEstudiantes = estudiantes.map((e) =>
					e.id === estudiante.id ? estudiante : e
				);
				setEstudiantes(updatedEstudiantes);
				setEstudianteActual(null);
			});
	};

	const handleDelete = (estudiante) => {
		axios.delete(`${BASE_URL}/eliminar_estudiante/${estudiante.id}/`).then(() => {
			const updatedEstudiantes = estudiantes.filter((e) => e.id !== estudiante.id);
			setEstudiantes(updatedEstudiantes);
		});
	};

	return (
		<div>
			<h1>Gestión de estudiantes</h1>
			{ estudianteActual ? (
				<EstudianteForm
					onSubmit={ estudianteActual.id ? handleUpdate : handleCreate }
					onCancel={ () => setEstudianteActual(null) }
					estudiante={ estudianteActual }
				/>
			) : (
				<EstudianteList
					estudiantes={ estudiantes }
					onDelete={ handleDelete }
					onEdit={ (estudiante) => setEstudianteActual(estudiante) }
				/>
			) }
		</div>
	);
};

export default App;