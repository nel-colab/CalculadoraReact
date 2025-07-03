import React, { useEffect, useState } from "react";
import { Table, Container, Form, Button, Spinner, Alert } from "react-bootstrap";
import { obtenerOperaciones, type Operacion } from "../api/opreationService"; // Ruta corregida

const History = () => {
  const [operaciones, setOperaciones] = useState<Operacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [ordenAscendente, setOrdenAscendente] = useState(false);

  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    const fetchOperaciones = async () => {
      try {
        const data = await obtenerOperaciones(token);
        setOperaciones(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchOperaciones();
  }, [token]);

  const tiposUnicos = ["Todos", ...new Set(operaciones.map((op) => op.tipoOperacion))];

  const operacionesFiltradas = operaciones.filter(
    (op) => filtroTipo === "Todos" || op.tipoOperacion === filtroTipo
  );

  const operacionesOrdenadas = operacionesFiltradas.sort((a, b) => {
    const fechaA = new Date(a.fechaHora);
    const fechaB = new Date(b.fechaHora);
    return ordenAscendente ? fechaA.getTime() - fechaB.getTime() : fechaB.getTime() - fechaA.getTime();
  });

  const ultimaOperacion = operacionesOrdenadas[0] || null;

  return (
    <Container className="bienvenida py-5" style={{ paddingTop: "80px" }}>
      <h2 className="mb-4 text-center">Historial de Operaciones</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : (
        <>
          {ultimaOperacion && (
            <div
              style={{
                backgroundColor: "#e9f7ef",
                border: "1px solid #28a745",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "20px",
                fontWeight: "600",
                fontSize: "1.2rem",
                textAlign: "center",
                color: "#155724",
              }}
            >
              Última operación:{" "}
              <strong>{ultimaOperacion.tipoOperacion}</strong>  {ultimaOperacion.expresion}
            </div>
          )}

          <Form className="d-flex justify-content-between mb-3">
            <Form.Group controlId="filtroTipo" style={{ minWidth: "200px" }}>
              <Form.Label>Filtrar por Tipo de Operación:</Form.Label>
              <Form.Select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
                {tiposUnicos.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button
              variant="outline-primary"
              onClick={() => setOrdenAscendente(!ordenAscendente)}
              style={{ height: "40px", alignSelf: "flex-end" }}
            >
              Ordenar por Fecha: {ordenAscendente ? "Ascendente ↑" : "Descendente ↓"}
            </Button>
          </Form>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Expresión</th>
                <th>Resultado</th>
                <th>Tipo de Operación</th>
                <th>Fecha y Hora</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {operacionesOrdenadas.map((op) => (
                <tr key={op.id}>
                  <td>{op.id}</td>
                  <td>{op.expresion}</td>
                  <td>{op.resultado}</td>
                  <td>{op.tipoOperacion}</td>
                  <td>{op.fechaHora}</td>
                  <td>{op.username}</td>
                </tr>
              ))}
              {operacionesOrdenadas.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center">
                    No hay operaciones para mostrar.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default History;
