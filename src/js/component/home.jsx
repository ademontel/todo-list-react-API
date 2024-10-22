import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
    let [listaDeTareas, setListaDeTareas] = useState([]); 
    const [nuevaTarea, setNuevaTarea] = useState("");
    const userName = "ademontel";  
    const urlUser = `https://playground.4geeks.com/todo/users/${userName}`;
    const urlTodos = `https://playground.4geeks.com/todo/todos/`;

    // Levantar tareas al inicio una sola vez con useEffect []
    const cargarTareas = async () => {
        try {
            const resp = await fetch(urlUser);
            const data = await resp.json();
            //console.log(data);
            //console.log(data.todos);
            setListaDeTareas(data.todos);

        } catch (error) {
            console.error("Error al cargar las tareas", error);
            setListaDeTareas([]); 
        }
    };

    useEffect(() => {
        cargarTareas();
    }, []);

    // Agrgar una tarea "todo"
    const agregarTarea = async () => {
        if (nuevaTarea.trim() === "") return;

        const resp = await fetch(`${urlTodos}${userName}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                label: nuevaTarea,
                is_done: false, 
            }),
        });

        if (resp.ok) {
            setNuevaTarea(""); 
            cargarTareas(); 
        } else {
            console.error("Error al agregar la tarea");
        }
    };

    // Eliminar tarea
    const eliminarTarea = async (todo_id) => {
        const resp = await fetch(`${urlTodos}${todo_id}`, {
            method: "DELETE",
        });

        if (resp.ok) {
            cargarTareas();
        } else {
            console.error("Error al eliminar la tarea");
        }
    };

    return (
        <div id="ppal" className="container mt-5 w-75 mx-auto">
            <h1 className="text-center mt-5">todos </h1>
            <div className="col-6 mx-auto">
                <input
                    type="text"
                    className="form-control"
                    placeholder="¿Qué tarea quieres hacer?"
                    value={nuevaTarea}
                    onChange={(evento) => setNuevaTarea(evento.target.value)}
                    onKeyUp={(evento) => {
                        if (evento.key === "Enter") {
                            agregarTarea(); 
                        }
                    }}
                />
                <ul className="list-group">
                    {Array.isArray(listaDeTareas) && listaDeTareas.length > 0 ? (
                        listaDeTareas.map((item, index) => (
                            <li className="list-group-item" key={item.id}>
                                {item.label}
                                <i
                                    onClick={() => eliminarTarea(item.id)}
                                    className="fa-solid fa-trash icono-oculto"
                                ></i>
                            </li>
                        ))
                    ) : (
                        <li className="list-group-item">No hay tareas disponibles</li>
                    )}
                </ul>
                <hr className="border border-secondary border-1 opacity-30"></hr>
                <span className="text-secondary-emphasis">
                    {listaDeTareas.length} items left
                </span>
                <br />
                <span className="text-secondary-emphasis">
                    {listaDeTareas.length === 0 ? "No hay tareas, agrega una" : ""}
                </span>
            </div>
        </div>
    );
};

export default Home;