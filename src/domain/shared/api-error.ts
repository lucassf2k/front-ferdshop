export type AppError =
  | { type: 'NetworkError'; message: string }
  | { type: 'UnauthorizedError'; message: string }
  | {
      type: 'ValidationError';
      message: string;
      fieldErrors?: Record<string, string>;
    }
  | { type: 'NotFoundError'; message: string }
  | { type: 'UnknownError'; message: string };

const toUserMessage = (error: AppError): string => {
  switch (error.type) {
    case 'NetworkError':
      return 'Falha de conexão. Verifique sua internet.';
    case 'UnauthorizedError':
      return 'Sua sessão expirou. Faça login novamente.';
    case 'ValidationError':
      return error.message || 'Dados inválidos.';
    case 'NotFoundError':
      return 'Recurso não encontrado.';
    default:
      return 'Ocorreu um erro inesperado.';
  }
};

export const aooError = { toUserMessage } as const;
