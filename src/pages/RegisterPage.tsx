import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Alert,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { register } from "../api/clientService";
import {
  EnvelopeFill,
  LockFill,
  PersonFill,
} from "react-bootstrap-icons";

interface FormData {
  nombre: string;
  user: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    user: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
    setSuccess("");
  };

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { nombre, user, email, confirmEmail, password, confirmPassword } =
      formData;

    if (
      !nombre ||
      !user ||
      !email ||
      !confirmEmail ||
      !password ||
      !confirmPassword
    ) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    if (email !== confirmEmail) {
      setError("Los correos electrónicos no coinciden.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      await register({ nombre, user, email, password });
      setSuccess("¡Registro exitoso! Puedes iniciar sesión ahora.");
      setError("");
      setTimeout(() => navigate("/loginPage"), 2000);
    } catch (err: any) {
      setError(err.message || "Error al registrar");
      setSuccess("");
    }
  };

  return (
    <Container className="py-5" style={{ paddingTop: "80px" }}>
      <h2 className="mb-4 text-center">Registro de Usuario</h2>

      <div
        style={{
          backgroundColor: "#f0f8ff",
          border: "1px solid #007bff",
          borderRadius: "12px",
          padding: "30px",
          maxWidth: "600px",
          margin: "0 auto",
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
        }}
      >
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Nombre completo</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <PersonFill />
              </InputGroup.Text>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ingresa tu nombre completo"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nombre de usuario</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <PersonFill />
              </InputGroup.Text>
              <Form.Control
                type="text"
                name="user"
                value={formData.user}
                onChange={handleChange}
                placeholder="Ingresa tu nombre de usuario"
              />
            </InputGroup>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Correo electrónico</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <EnvelopeFill />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ejemplo@correo.com"
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Confirmar correo</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <EnvelopeFill />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    name="confirmEmail"
                    value={formData.confirmEmail}
                    onChange={handleChange}
                    placeholder="Confirma tu correo"
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <LockFill />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Mínimo 6 caracteres"
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label>Confirmar contraseña</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <LockFill />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirma tu contraseña"
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <div className="text-center">
            <Button type="submit" variant="success" size="lg" style={{ width: "100%" }}>
              Registrarse
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default RegisterPage;
