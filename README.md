# 🧮 Frontend de Calculadora con Registro de Usuarios (React + Bootstrap)

Este proyecto es una aplicación frontend construida con **React**, **TypeScript**, **axio**, **Bootstrap** y **React Router**, que permite a los usuarios:

- Registrarse y autenticarse con JWT.
- Utilizar una calculadora funcional.
- Guardar y visualizar su historial de operaciones matemáticas.
- Interactuar con una API backend desarrollada con Spring Boot.

---

## 🚀 Tecnologías utilizadas

- React (con TypeScript)
- Bootstrap 5
- React Router v6
- Axios
- React Icons (Bootstrap Icons)
- API backend en Spring Boot

---

## 📦 Características

- Registro de nuevos usuarios
- Inicio de sesión con token JWT
- Protección de rutas autenticadas
- Calculadora básica (suma, resta, multiplicación, división, etc)
- Historial de operaciones en una tabla
- Manejo de errores y mensajes de éxito
- Diseño responsive con Bootstrap

---

## 📁 Estructura del proyecto

```
src/
├── api/                 → Lógica para interactuar con la API
├── assets/              → Recursos usados (Logo)
├── components/          → Componentes reutilizables (Navbar, PrivateRoute, etc.)
├── pages/               → Vistas principales (Login, Register, Home, etc.)
├── App.tsx              → Rutas principales
├── main.tsx             → Punto de entrada de la aplicación
└── types/               → Tipado TypeScript compartido
└── vite.config/         → Enmascaramiento de rutas
```

---

## 🔧 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/nel-colab/CalculadoraReact.git
cd CalculadoraReact
```

### 2. Instalar dependencias

```bash
npm install
# o con yarn
# yarn install
```

### 3. Ejecutar la app

```bash
npm run dev
# o con yarn
# yarn dev
```

La aplicación estará disponible en [http://localhost:5173](http://localhost:5173)

---

## ✅ Flujo de uso

1. **Registro:** El usuario se registra con su nombre, email, usuario y contraseña.
2. **Login:** El usuario se autentica. El token JWT se guarda en localStorage.
3. **Calculadora:** Puede operar y cada resultado se guarda en el backend.
4. **Historial:** Se muestra una tabla con el historial propio del usuario autenticado.

---

## 🔐 Seguridad

- Autenticación basada en JWT
- Se protege el acceso a rutas como la calculadora o historial
- Se elimina el token de localStorage al cerrar sesión
- Validaciones en frontend antes de enviar datos

---

## 🧪 Pruebas manuales

- [x] Registro exitoso y fallido (email inválido, ya registrado)
- [x] Login correcto e incorrecto (contraseña errónea)
- [x] Acceso protegido a páginas si no hay token
- [x] Operación y guardado en historial
- [x] Visualización correcta de la tabla

---

## 📧 Contacto

**Nelson Castillo**
GitHub: @nel-colab
Email: nel.castillo95@gmail.com
