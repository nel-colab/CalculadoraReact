import { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { evaluate } from "mathjs";
import { registrarOperacion } from "../api/opreationService";

const Inicio = () => {
  const [input, setInput] = useState("");

  const handleClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleEquals = async () => {
    try {
      const result = evaluate(input);
      const resultadoString = result.toString();
      setInput(resultadoString);

      // Detección del tipo de operación
      const operadores = {
        suma: /\+/,
        resta: /-/,
        multiplicación: /\*/,
        división: /\//,
        potencia: /\^/,
        función: /sqrt|log|ln|sin|cos|tan/,
      };

      const operacionesDetectadas = Object.entries(operadores)
        .filter(([_, regex]) => regex.test(input))
        .map(([op]) => op);

      let tipoOperacion = "otro";
      if (operacionesDetectadas.length > 1) {
        tipoOperacion = "operación compuesta";
      } else if (operacionesDetectadas.length === 1) {
        tipoOperacion = operacionesDetectadas[0];
      }

      const token = localStorage.getItem("token");
      if (!token) return; // Usuario no autenticado

      await registrarOperacion(
        {
          expresion: input,
          resultado: resultadoString,
          tipoOperacion,
        },
        token
      );
    } catch (error) {
      console.error("Error al calcular o registrar operación:", error);
      setInput("Error");
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-start pt-5 pb-3"
      style={{ minHeight: "100vh" }}
    >
      <Row className="justify-content-center w-100">
        <Col md={8}>
          <h2 className="text-center mb-4">Haz tus cálculos aquí</h2>

          <Form.Control
            type="text"
            value={input}
            readOnly
            className="mb-3 text-end"
            style={{ fontSize: "1.5rem", height: "3rem" }}
          />

          {/* Fila 1 */}
          <Row className="mb-2">
            <Col xs={2}><Button variant="secondary" size="lg" className="w-100 fw-bold" onClick={() => handleClick("1")}>1</Button></Col>
            <Col xs={2}><Button variant="secondary" size="lg" className="w-100 fw-bold" onClick={() => handleClick("2")}>2</Button></Col>
            <Col xs={2}><Button variant="secondary" size="lg" className="w-100 fw-bold" onClick={() => handleClick("3")}>3</Button></Col>
            <Col xs={2}><Button variant="secondary" size="lg" className="w-100 fw-bold" onClick={() => handleClick("+")}>+</Button></Col>
            <Col xs={2}><Button variant="dark" size="lg" className="w-100 fw-bold" onClick={() => handleClick("sin(")}>sin</Button></Col>
            <Col xs={2}><Button variant="dark" size="lg" className="w-100 fw-bold" onClick={() => handleClick("cos(")}>cos</Button></Col>
          </Row>

          {/* Fila 2 */}
          <Row className="mb-2">
            <Col xs={2}><Button variant="secondary" size="lg" className="w-100 fw-bold" onClick={() => handleClick("4")}>4</Button></Col>
            <Col xs={2}><Button variant="secondary" size="lg" className="w-100 fw-bold" onClick={() => handleClick("5")}>5</Button></Col>
            <Col xs={2}><Button variant="secondary" size="lg" className="w-100 fw-bold" onClick={() => handleClick("6")}>6</Button></Col>
            <Col xs={2}><Button variant="secondary" size="lg" className="w-100 fw-bold" onClick={() => handleClick("-")}>−</Button></Col>
            <Col xs={2}><Button variant="dark" size="lg" className="w-100 fw-bold" onClick={() => handleClick("tan(")}>tan</Button></Col>
            <Col xs={2}><Button variant="dark" size="lg" className="w-100 fw-bold" onClick={() => handleClick("log(")}>log</Button></Col>
          </Row>

          {/* Fila 3 */}
          <Row className="mb-2">
            <Col xs={2}><Button variant="secondary" size="lg" className="w-100 fw-bold" onClick={() => handleClick("7")}>7</Button></Col>
            <Col xs={2}><Button variant="secondary" size="lg" className="w-100 fw-bold" onClick={() => handleClick("8")}>8</Button></Col>
            <Col xs={2}><Button variant="secondary" size="lg" className="w-100 fw-bold" onClick={() => handleClick("9")}>9</Button></Col>
            <Col xs={2}><Button variant="secondary" size="lg" className="w-100 fw-bold" onClick={() => handleClick("*")}>*</Button></Col>
            <Col xs={2}><Button variant="dark" size="lg" className="w-100 fw-bold" onClick={() => handleClick("ln(")}>ln</Button></Col>
            <Col xs={2}><Button variant="dark" size="lg" className="w-100 fw-bold" onClick={() => handleClick("sqrt(")}>√</Button></Col>
          </Row>

          {/* Fila 4 */}
          <Row className="mb-2">
            <Col xs={4}><Button variant="secondary" size="lg" className="w-100 fw-bold" onClick={() => handleClick("00")}>00</Button></Col>
            <Col xs={2}><Button variant="secondary" size="lg" className="w-100 fw-bold" onClick={() => handleClick("0")}>0</Button></Col>
            <Col xs={2}><Button variant="secondary" size="lg" className="w-100 fw-bold" onClick={() => handleClick("/")}>/</Button></Col>
            <Col xs={2}><Button variant="secondary" size="lg" className="w-100 fw-bold" onClick={() => handleClick("^")}>^</Button></Col>
            <Col xs={2}><Button variant="success" size="lg" className="w-100 fw-bold" onClick={handleEquals}>=</Button></Col>
          </Row>

          {/* Fila final */}
          <Row className="mb-2">
            <Col xs={2}><Button variant="secondary" size="lg" className="w-100 fw-bold" onClick={() => handleClick("(")}>(</Button></Col>
            <Col xs={2}><Button variant="secondary" size="lg" className="w-100 fw-bold" onClick={() => handleClick(")")}>)</Button></Col>
            <Col xs={2}><Button variant="secondary" size="lg" className="w-100 fw-bold" onClick={() => handleClick(".")}>.</Button></Col>
            <Col xs={3}><Button variant="warning" size="lg" className="w-100 fw-bold" onClick={handleDelete}>⌫</Button></Col>
            <Col xs={3}><Button variant="danger" size="lg" className="w-100 fw-bold" onClick={handleClear}>C</Button></Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Inicio;
