// ListadoTareas.js
import React, { useState } from "react";
import { Stack, Container, Row, Col, Button } from "react-bootstrap";
import firebaseApp from "../credenciales";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import EditarTarea from "./EditarTarea";

const firestore = getFirestore(firebaseApp); // Add this line to declare firestore

const ListadoTareas = ({ arrayTareas, correoUsuario, setArrayTareas }) => {
  const [showEditarForm, setShowEditarForm] = useState(false);
  const [tareaEditar, setTareaEditar] = useState(null);

  const handleEditarClick = (tarea) => {
    setTareaEditar(tarea);
    setShowEditarForm(true);
  };

  const handleEditarGuardar = async (nuevaTarea) => {
    try {
      const nvoArrayTareas = arrayTareas.map((tarea) =>
        tarea.id === nuevaTarea.id ? nuevaTarea : tarea
      );

      const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
      await updateDoc(docuRef, { tareas: nvoArrayTareas });

      setArrayTareas(nvoArrayTareas);
      setShowEditarForm(false);
    } catch (error) {
      console.error("Error al guardar la tarea editada:", error);
    }
  };

  const eliminarTarea = (idTareaAEliminar) => {
    const nvoArrayTareas = arrayTareas.filter(
      (objetoTarea) => objetoTarea.id !== idTareaAEliminar
    );

    const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
    updateDoc(docuRef, { tareas: [...nvoArrayTareas] });
    setArrayTareas(nvoArrayTareas);
  };

  return (
    <Container>
      <Stack>
        {arrayTareas.map((objetoTarea) => (
          <Row key={objetoTarea.id}>
            <Col>{objetoTarea.titulo}</Col>
            <Col>{objetoTarea.autor}</Col>
            <Col>{objetoTarea.descripcion}</Col>
            <Col>{objetoTarea.disponibilidad}</Col>
            <Col>{objetoTarea.año}</Col>
            <Col className="mb-4">
              <Button onClick={() => handleEditarClick(objetoTarea)}>
                Editar libro
              </Button>
            </Col>
            <Col>
              <Button
                variant="danger"
                onClick={() => eliminarTarea(objetoTarea.id)}
              >
                Eliminar Tarea
              </Button>
            </Col>
          </Row>
        ))}
      </Stack>

      {showEditarForm && tareaEditar && (
        <EditarTarea
          tarea={tareaEditar}
          onClose={() => setShowEditarForm(false)}
          onSave={handleEditarGuardar}
        />
      )}
    </Container>
  );
};

export default ListadoTareas;
