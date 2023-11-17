import React, { useState, useEffect } from "react";

import firebaseApp from "../credenciales";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

import { Container, Button } from "react-bootstrap";

import AgregarTarea from "./AgregarTarea";
import ListadoTareas from "./ListadoTareas";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Home = ({ correoUsuario }) => {
  const [arrayTareas, setArrayTareas] = useState(null);
  const fakeData = [
    { id: 1, titulo: "Libro por defecto 1", autor: "Auto por defecto 1",descripcion: "Descripcion por defecto 1",disponibilidad: "Disponibilidad por defecto 1",año: "Año por defecto 1" },
    { id: 3, titulo: "Libro por defecto 2", autor: "Auto por defecto 2",descripcion: "Descripcion por defecto 2",disponibilidad: "Disponibilidad por defecto 2",año: "Año por defecto 2" },
    { id: 3, titulo: "Libro por defecto 3", autor: "Auto por defecto 3",descripcion: "Descripcion por defecto 3",disponibilidad: "Disponibilidad por defecto 3",año: "Año por defecto 3" }
  ];


  async function buscarDocumentOrCrearDocumento(idDocumento) {
    //crear referencia al documento
    const docuRef = doc(firestore, `usuarios/${idDocumento}`);
    // buscar documento
    const consulta = await getDoc(docuRef);
    // revisar si existe
    if (consulta.exists()) {
      // si sí existe
      const infoDocu = consulta.data();
      return infoDocu.tareas;
    } else {
      // si no existe
      await setDoc(docuRef, { tareas: [...fakeData] });
      const consulta = await getDoc(docuRef);
      const infoDocu = consulta.data();
      return infoDocu.tareas;
    }
  }

  useEffect(() => {
    async function fetchTareas() {
      const tareasFetchadas = await buscarDocumentOrCrearDocumento(
        correoUsuario
      );
      setArrayTareas(tareasFetchadas);
    }

    fetchTareas();
  }, []);
  
  return (
    <Container>
      <h4 className="text-center mt-4">hola, sesión iniciada</h4>
      <div className="d-flex justify-content-center align-items-center">
      <Button onClick={() => signOut(auth)}>Cerrar sesión</Button>
    </div>
      <hr />
      <AgregarTarea
        arrayTareas={arrayTareas}
        setArrayTareas={setArrayTareas}
        correoUsuario={correoUsuario}
      />
      {arrayTareas ? (
        <ListadoTareas
          arrayTareas={arrayTareas}
          setArrayTareas={setArrayTareas}
          correoUsuario={correoUsuario}
        />
      ) : null}
    </Container>
  )
}

export default Home
