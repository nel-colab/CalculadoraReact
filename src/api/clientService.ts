import axios, { AxiosError } from "axios";

interface LoginPayload {
  user: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

interface RegisterPayload {
  user: string;
  nombre: string;
  email: string;
  password: string;
}

const axiosClient = axios.create({
  baseURL: '/api',  // proxy de Vite o tu base URL real
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await axiosClient.post<LoginResponse>("/users/login", payload);

    if (!response.data || !response.data.token) {
      throw new Error("Usuario o clave inválida");
    }

    return response.data;
  } catch (error: unknown) {
    let errorMessage = "Error al iniciar sesión";

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;
      if (axiosError.response?.status === 401) {
        const data = axiosError.response.data;
        errorMessage =
          typeof data === "string"
            ? "Usuario o clave inválida"
            : data?.message || "Usuario o clave inválida";
      } else {
        errorMessage =
          axiosError.response?.data?.message ||
          axiosError.message ||
          errorMessage;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
};

export const register = async (payload: RegisterPayload): Promise<void> => {
  try {
    await axiosClient.post("/users/register", payload);
  } catch (error: unknown) {
    let errorMessage = "Error al registrar usuario";

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;
      errorMessage =
        axiosError.response?.data?.message ||
        axiosError.message ||
        errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
};

export default axiosClient;
