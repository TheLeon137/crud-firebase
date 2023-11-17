import React, { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";

const EditarTarea = ({ tarea, onClose, onSave }) => {
  const [formValues, setFormValues] = useState(tarea);
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

  const handleSave = () => {
    if (!validateForm()) {
      // Si hay errores, no proceder con la actualización de la tarea
      return;
    }

    onSave(formValues);
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Tarea</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="titulo">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              value={formValues.titulo}
              onChange={handleChange}
              isInvalid={!!errors.titulo}
            />
            <Form.Control.Feedback type="invalid">
              {errors.titulo}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="autor">
            <Form.Label>Autor</Form.Label>
            <Form.Control
              type="text"
              value={formValues.autor}
              onChange={handleChange}
              isInvalid={!!errors.autor}
            />
            <Form.Control.Feedback type="invalid">
              {errors.autor}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="descripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              value={formValues.descripcion}
              onChange={handleChange}
              isInvalid={!!errors.descripcion}
            />
            <Form.Control.Feedback type="invalid">
              {errors.descripcion}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="disponibilidad">
            <Form.Label>Disponibilidad</Form.Label>
            <Form.Control
              type="text"
              value={formValues.disponibilidad}
              onChange={handleChange}
              isInvalid={!!errors.disponibilidad}
            />
            <Form.Control.Feedback type="invalid">
              {errors.disponibilidad}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="año">
            <Form.Label>Año</Form.Label>
            <Form.Control
              type="number"
              value={formValues.año}
              onChange={handleChange}
              isInvalid={!!errors.año}
            />
            <Form.Control.Feedback type="invalid">
              {errors.año}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" onClick={handleSave}>
            Guardar cambios
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditarTarea;
