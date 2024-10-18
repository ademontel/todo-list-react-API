import React, {useState} from "react";


//create your first component
const Home = () => {
	let [listaDeTareas, setListaDeTareas] = useState(["bañarse","limpiar","cocinar","aprender react"]);
	const [nuevaTarea, setNuevaTarea] = useState("")
	return (
		<div id="ppal" className="container mt-5 w-75 mx-auto">
			<h1 className="text-center mt-5">todos </h1> 
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
				//	console.log(evento.key)
				}}

			/>
			<ul className="list-group">
				{listaDeTareas.map((item,index) =>{
					return(
					<li className="list-group-item" key={index}>
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
			<hr className="border border-secondary border-1 opacity-30"></hr>
			<span className="text-secondary-emphasis">
				{listaDeTareas.length} items left
			</span><br />
			<span className="text-secondary-emphasis">
				{(listaDeTareas.length == 0)?"No hay tareas, agrega una":""}
			</span>
			</div>
		</div>
	);
};

export default Home;
