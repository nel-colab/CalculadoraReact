import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, InputGroup } from "react-bootstrap";
import { login } from "../api/clientService";
import { PersonFill, LockFill } from "react-bootstrap-icons"; // 👈 íconos añadidos

interface FormData {
  user: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    user: "",
    password: "",
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.user || !formData.password) {
      setError("Por favor, completa todos los campos");
      return;
    }

    try {
      const { token } = await login(formData);
      localStorage.setItem("token", token);
      setSuccess("¡Inicio de sesión exitoso!");
      setError("");
      navigate("/home");
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
      setSuccess("");
    }
  };

  return (
    <Container className="py-5" style={{ paddingTop: "80px" }}>
      <h2 className="mb-4 text-center">Iniciar Sesión</h2>

      <div
        style={{
          backgroundColor: "#f0f8ff",
          border: "1px solid #007bff",
          borderRadius: "8px",
          padding: "25px",
          maxWidth: "500px",
          margin: "0 auto",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Usuario</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <PersonFill />
              </InputGroup.Text>
              <Form.Control
                type="text"
                name="user"
                value={formData.user}
                onChange={handleChange}
                placeholder="Ingresa tu usuario"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-4">
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
                placeholder="Ingresa tu contraseña"
              />
            </InputGroup>
          </Form.Group>

          <div className="text-center">
            <Button type="submit" variant="primary">
              Iniciar Sesión
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default LoginPage;
