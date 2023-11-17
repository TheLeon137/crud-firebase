import React, { useState } from "react";
import { Container, Form, Col, Row, Button, Alert } from "react-bootstrap";

import firebaseApp from "../credenciales";
import { getFirestore, updateDoc, doc } from "firebase/firestore";

const firestore = getFirestore(firebaseApp);

const ArgegarTarea = ({ correoUsuario, setArrayTareas, arrayTareas }) => {
  const [formValues, setFormValues] = useState({
    titulo: "",
    autor: "",
    descripcion: "",
    disponibilidad: "",
    año: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({
      ...formValues,
      [id]: value,
    });
    // Limpiar el error al cambiar el valor del campo
    setErrors({
      ...errors,
      [id]: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};
    // Validar que los campos no estén vacíos
    Object.keys(formValues).forEach((key) => {
      if (!formValues[key]) {
        newErrors[key] = "Este campo no puede estar vacío";
      }
    });
    setErrors(newErrors);
    // Devolver true si no hay errores, false de lo contrario
    return Object.keys(newErrors).length === 0;
  };

  async function añadirTarea(e) {
    e.preventDefault();

    if (!validateForm()) {
      // Si hay errores, no proceder con la adición de la tarea
      return;
    }

    const {
      titulo,
      autor,
      descripcion,
      disponibilidad,
      año,
    } = formValues;

    // Crear nuevo array de tareas
    const nvoArrayTareas = [
      ...arrayTareas,
      {
        id: +new Date(),
        titulo,
        autor,
        descripcion,
        disponibilidad,
        año,
      },
    ];

    // Actualizar base de datos
    const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
    await updateDoc(docuRef, { tareas: [...nvoArrayTareas] });

    // Actualizar estado
    setArrayTareas(nvoArrayTareas);

    // Limpiar form
    setFormValues({
      titulo: "",
      autor: "",
      descripcion: "",
      disponibilidad: "",
      año: "",
    });
  }

  return (
    <Container>
      <Form onSubmit={añadirTarea}>
        <Row className="mb-5">
          <Col>
            <Form.Control
              type="text"
              placeholder="Título"
              id="titulo"
              value={formValues.titulo}
              onChange={handleChange}
              isInvalid={!!errors.titulo}
            />
            <Form.Control.Feedback type="invalid">
              {errors.titulo}
            </Form.Control.Feedback>
          </Col>

          <Col>
            <Form.Control
              type="text"
              placeholder="Autor"
              id="autor"
              value={formValues.autor}
              onChange={handleChange}
              isInvalid={!!errors.autor}
            />
            <Form.Control.Feedback type="invalid">
              {errors.autor}
            </Form.Control.Feedback>
          </Col>

          <Col>
            <Form.Control
              type="text"
              placeholder="Descripción"
              id="descripcion"
              value={formValues.descripcion}
              onChange={handleChange}
              isInvalid={!!errors.descripcion}
            />
            <Form.Control.Feedback type="invalid">
              {errors.descripcion}
            </Form.Control.Feedback>
          </Col>

          <Col>
            <Form.Control
              type="text"
              placeholder="Disponibilidad"
              id="disponibilidad"
              value={formValues.disponibilidad}
              onChange={handleChange}
              isInvalid={!!errors.disponibilidad}
            />
            <Form.Control.Feedback type="invalid">
              {errors.disponibilidad}
            </Form.Control.Feedback>
          </Col>

          <Col>
            <Form.Control
              type="number"
              placeholder="Año"
              id="año"
              value={formValues.año}
              onChange={handleChange}
              isInvalid={!!errors.año}
            />
            <Form.Control.Feedback type="invalid">
              {errors.año}
            </Form.Control.Feedback>
          </Col>

          <Col>
            <Button type="submit"> Agregar Libro</Button>
          </Col>
        </Row>
      </Form>
      <hr />
    </Container>
  );
};

export default ArgegarTarea;
