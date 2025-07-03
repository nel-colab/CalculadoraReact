import { useState } from "react";
import { Container, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ContactPage: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const validarEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nombreTrimmed = nombre.trim();
    const emailTrimmed = email.trim();
    const mensajeTrimmed = mensaje.trim();

    if (!nombreTrimmed || !mensajeTrimmed) {
      alert("Por favor, ingresa texto válido en Nombre y Mensaje.");
      return;
    }

    if (emailTrimmed && !validarEmail(emailTrimmed)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    const numeroWhatsapp = "56957417452";

    const texto = `
*Nuevo contacto desde el formulario:*
👤 Nombre: ${nombreTrimmed}
📧 Email: ${emailTrimmed || "No proporcionado"}
📝 Motivo de contacto: ${mensajeTrimmed}
    `;

    const url = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(
      texto.trim()
    )}`;
    window.open(url, "_blank");
  };

  return (
    <Container className="mt-5 pt-4 d-flex justify-content-center">
      <Col md={6} className="bg-light p-4 rounded shadow">
        <h1 className="text-center mb-4">Contactame</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formNombre">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMensaje">
            <Form.Label>Motivo de contacto:</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Escribe tu mensaje aquí"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formEmail">
            <Form.Label>Correo electrónico (opcional):</Form.Label>
            <Form.Control
              type="email"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit" size="lg">
              Enviar por WhatsApp
            </Button>
          </div>
        </Form>
      </Col>
    </Container>
  );
};

export default ContactPage;
