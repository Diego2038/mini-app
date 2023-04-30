import axios from 'axios';
import React, { useEffect, useState } from "react";
import { EstudianteForm } from "./components/EstudianteForm";
import { EstudianteList } from "./components/EstudianteList";
import TablaMaterias from './components/TablaMaterias';
import FormMateria from './components/FormMateria';

const BASE_URL = "http://localhost:8000";

export const App = () => {
	const [estudiantes, setEstudiantes] = useState([]);
	const [estudianteActual, setEstudianteActual] = useState(null);

	const [materias, setMaterias] = useState([]);
	const [materiaActual, setMateriaActual] = useState(null);

	useEffect(() => {
		axios.get(`${BASE_URL}/leer_estudiantes/`).then((response) => {
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
			const respuesta = await axios.get(`${BASE_URL}/leer_materias/`);
			setMaterias(respuesta.data.materias);
		} catch (error) {
			console.error(error);
		}
	};

	const crearMateria = async (materia) => {
		try {
			const respuesta = await axios.post(`${BASE_URL}/crear_materia/`, materia);
			setMaterias([...materias, materia]);
		} catch (error) {
			console.error(error);
		}
	};

	const actualizarMateria = async (materia) => {
		try {
			const respuesta = await axios.put(`${BASE_URL}/modificar_materia/${materia.id}/`, materia);
			setMaterias(materias.map((m) => (m.id === materia.id ? materia : m)));
		} catch (error) {
			console.error(error);
		}
	};

	const eliminarMateria = async (materiaId) => {
		try {
			await axios.delete(`${BASE_URL}/eliminar_materia/${materiaId}/`);
			setMaterias(materias.filter((m) => m.id !== materiaId));
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div style={ { display: "flex", flexDirection: 'column', gap: 12 } }>
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
			<div style={ { display: 'flex', gap: 6 } }>
				<TablaMaterias
					materias={ materias }
					onEliminar={ eliminarMateria }
					onEditar={ (materia) => setMateriaActual(materia) }
				/>
				<FormMateria
					onSubmit={ materiaActual ? actualizarMateria : crearMateria }
					onCancel={ () => setMateriaActual(null) }
					materia={ materiaActual }
				/>
			</div>
		</div>
	);
};

export default App;
