import React, {useState} from "react";


//create your first component
const Home = () => {
	let [listaDeTareas, setListaDeTareas] = useState(["bañarse","limpiar","cocinar","aprender react"]);
	const [nuevaTarea, setNuevaTarea] = useState("")
	return (
		<div className="container mt-5">
			<h1 className="text-center mt-5">TO-DOs</h1>
			<div className="col-6 mx-auto">
			<input type="text" className="form-control" placeholder="¿Qué tarea quieres hacer?" 
			value={nuevaTarea} onChange={(evento) => {
					setNuevaTarea(evento.target.value)
				}}
				onKeyUp={(evento) =>{
					if (evento.key == "Enter") {
						setListaDeTareas([...listaDeTareas ,nuevaTarea]);
						setNuevaTarea("")
						
					}
					console.log(evento.key)
				}}

			/>
			<ul>
				{listaDeTareas.map((item,index) =>{
					return(
					<li key={index}>
						{item}<i onClick={()=>{
							const aux = listaDeTareas.filter((_task, ind) => {
								return(ind != index)
							})
							setListaDeTareas(aux)
						}} 
						className="fa-solid fa-trash icono-oculto"></i>
					</li>
				)})}
			</ul>
			<span>
				{listaDeTareas.length} items left
			</span><br />
			<span>
				{(listaDeTareas.length == 0)?"No hay tareas, agrega una":""}
			</span>
			</div>
		</div>
	);
};

export default Home;
