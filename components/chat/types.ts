export type Archivo = {
  id: string;
  nombre: string;
  tipo: string;
  tamaño: number;
  preview?: string;
  contenido: string;
  fechaSubida: string;
};

export type Mensaje = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

export type Conversacion = {
  id: string;
  mensajes: Mensaje[];
  fechaCreacion: string;
  preview: string;
};
