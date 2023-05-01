import React, { useState } from "react";
import axios from 'axios';

export const EstudianteList = ({ estudiantes, onEdit, onDelete }) => {
	const [matriculas, setMatriculas] = useState([]);
	const [showMatriculas, setShowMatriculas] = useState(false);
	const [selectedEstudiante, setSelectedEstudiante] = useState(null);

	const handleViewMatriculas = async (estudiante) => {
		setSelectedEstudiante(estudiante);
		try {
			const response = await axios.get(`http://localhost:8000/ver_materias_en_estudiante/${estudiante.id}/`);
			setMatriculas(response.data.materias_matriculadas);
			setShowMatriculas(true);
		} catch (error) {
			console.error(error);
		}
	};

	const handleHideMatriculas = () => {
		setShowMatriculas(false);
	};

	return (
		<div>
			<h2>Lista de estudiantes</h2>
			<div style={ { display: "flex", gap: 4 } }>
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
							<tr key={ estudiante.correo_electronico }>
								<td>{ estudiante.id }</td>
								<td>{ estudiante.nombre }</td>
								<td>{ estudiante.edad }</td>
								<td>{ estudiante.correo_electronico }</td>
								<td>

									<button onClick={ () => handleViewMatriculas(estudiante) }>Ver matrículas</button>
									<button onClick={ () => onEdit(estudiante) }>Editar</button>
									<button onClick={ () => onDelete(estudiante) }>Eliminar</button>
								</td>
							</tr>
						)) }
					</tbody>
				</table>
				{ showMatriculas && (
					<div>
						<h2>Matrículas de { selectedEstudiante.nombre }</h2>
						<table>
							<thead>
								<tr>
									<th>Materia</th>
								</tr>
							</thead>
							<tbody>
								{ matriculas.map((matricula) => (
									<tr key={ matricula }>
										<td>{ matricula }</td>
									</tr>
								)) }
							</tbody>
						</table>
						<button onClick={ handleHideMatriculas }>Cerrar</button>
					</div>
				) }
			</div>
		</div>
	);
};