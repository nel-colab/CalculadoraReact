import axios, { AxiosError } from "axios";

export interface OperacionPayload {
  expresion: string;
  resultado: string;
  tipoOperacion: string;
  username: string;
}

export interface Operacion {
  id: number;
  expresion: string;
  resultado: string;
  tipoOperacion: string;
  fechaHora: string;
  username: number;
}

const axiosClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const registrarOperacion = async (
  payload: Omit<OperacionPayload, "username">,
  token: string
): Promise<Operacion> => {
  try {
    console.log("Payload sin username:", payload);
    console.log("Token enviado:", token);

    // Decodificar el token para obtener el username
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = JSON.parse(atob(base64));
    const username = decodedPayload.sub;

    if (!username) {
      throw new Error("Token inválido: username no encontrado");
    }

    // Agregar el username al payload
    const payloadConUsername: OperacionPayload = {
      ...payload,
      username,
    };

    const response = await axiosClient.post<Operacion>(
      "calculator/registrarOperacion",
      payloadConUsername,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    let errorMessage = "Error al registrar operación";

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;
      console.error("Detalles del error:", axiosError.response?.data);

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


export const obtenerOperaciones = async (
  token: string
): Promise<Operacion[]> => {
  try {
    const response = await axiosClient.get<Operacion[]>("calculator/listOperaciones", {
      headers: {
        Authorization: `Bearer ${token}`, // <-- Aquí está el cambio clave
      },
    });
    return response.data;
  } catch (error: unknown) {
    let errorMessage = "Error al obtener operaciones";

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
