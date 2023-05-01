import React, { useState } from 'react';
import axios from 'axios';

function TablaMaterias(props) {
	const { materias, onEditar, onEliminar } = props;
	const [estudiantes, setEstudiantes] = useState([]);
	const [showEstudiantes, setShowEstudiantes] = useState(false);
	const [materiaId, setMateriaId] = useState("");

	const verEstudiantes = async (id) => {
		setMateriaId(id);
		try {
			const response = await axios.get(`http://localhost:8000/ver_estudiantes_en_materia/${id}/`);
			setEstudiantes(response.data.estudiantes);
			setShowEstudiantes(true);
		} catch (error) {
			console.log(error);
		}
	};

	const cerrarModal = () => {
		setShowEstudiantes(false);
	};

	return (
		<div>
			<h2>Lista de materias</h2>
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
								<button onClick={ () => verEstudiantes(materia.id) }>Ver Estudiantes</button>
								<button onClick={ () => onEditar(materia) }>Editar</button>
								<button onClick={ () => onEliminar(materia.id) }>Eliminar</button>
							</td>
						</tr>
					)) }
				</tbody>
			</table>
			{ showEstudiantes && (
				<div>
					<h2>Estudiantes matriculados en la materia { materiaId }</h2>
					<table>
						<thead>
							<tr>
								<th>Nombre</th>
								<th>Edad</th>
								<th>Correo Electrónico</th>
							</tr>
						</thead>
						<tbody>
							{ estudiantes.map((estudiante) => (
								<tr key={ estudiante.correo_electronico }>
									<td>{ estudiante.nombre }</td>
									<td>{ estudiante.edad }</td>
									<td>{ estudiante.correo_electronico }</td>
								</tr>
							)) }
						</tbody>
					</table>
					<button onClick={ cerrarModal }>Cerrar</button>
				</div>
			) }
		</div>
	);
}

export default TablaMaterias;
