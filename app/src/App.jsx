import axios from 'axios';
import React, { useEffect, useState } from "react";
import { EstudianteForm } from "./components/EstudianteForm";
import { EstudianteList } from "./components/EstudianteList";

const BASE_URL = "http://localhost:8000";

export const App = () => {
	const [estudiantes, setEstudiantes] = useState([]);
	const [estudianteActual, setEstudianteActual] = useState(null);

	const [materias, setMaterias] = useState([]);

	useEffect(() => {
		axios.get(`${BASE_URL}/leer_estudiantes/`).then((response) => {
			console.log(response.data.estudiantes);
			setEstudiantes(response.data.estudiantes);
		});

		obtenerMaterias();
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

	const obtenerMaterias = async () => {
		try {
			const respuesta = await axios.get('http://localhost:8000/materias/');
			setMaterias(respuesta.data);
		} catch (error) {
			console.error(error);
		}
	};

	const crearMateria = async (materia) => {
		try {
			const respuesta = await axios.post('http://localhost:8000/materias/', materia);
			setMaterias([...materias, respuesta.data]);
		} catch (error) {
			console.error(error);
		}
	};

	const actualizarMateria = async (materia) => {
		try {
			const respuesta = await axios.put(`http://localhost:8000/materias/${materia.id}/`, materia);
			setMaterias(materias.map((m) => (m.id === materia.id ? respuesta.data : m)));
		} catch (error) {
			console.error(error);
		}
	};

	const eliminarMateria = async (materia) => {
		try {
			await axios.delete(`http://localhost:8000/materias/${materia.id}/`);
			setMaterias(materias.filter((m) => m.id !== materia.id));
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<h1>Gestión de estudiantes</h1>
			<div style={ { display: 'flex', gap: 6 } }>
				<EstudianteList
					estudiantes={ estudiantes }
					onDelete={ handleDelete }
					onEdit={ (estudiante) => setEstudianteActual(estudiante) }
				/>
				<EstudianteForm
					onSubmit={ estudianteActual ? handleUpdate : handleCreate }
					onCancel={ () => setEstudianteActual(null) }
					estudiante={ estudianteActual ?? { id: '', nombre: '', edad: 0, correo_electronico: '' } }
				/>
			</div>
		</div>
	);
};

export default App;