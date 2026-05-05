import { API_ERROR_MESSAGES, type ApiErrorCodeType } from './error-messages';

export type AppError =
  | { type: 'NetworkError' }
  | { type: 'UnknownError' }
  | { type: 'ApiError'; code: ApiErrorCodeType; message: string };

const DEFAULT_MESSAGE = 'Ocorreu um erro inesperado';

const toUserMessage = (error: AppError): string => {
  switch (error.type) {
    case 'NetworkError': {
      return 'Falha na conexão com o servidor. Verifique sua conexão e tente novamente.';
    }
    case 'ApiError': {
      return API_ERROR_MESSAGES[error.code] ?? DEFAULT_MESSAGE;
    }
    default: {
      return DEFAULT_MESSAGE;
    }
  }
};

export const appError = { toUserMessage } as const;
