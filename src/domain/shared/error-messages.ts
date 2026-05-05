export const API_ERROR_MESSAGES = {
  EMAIL_ALREADY_EXISTS: 'Desculpe, este e-mail já está em uso',
  PASSWORD_INCORRECT: 'Desculpe, a senha informada está incorreta',
  USER_NOT_FOUND: 'Desculpe, não foi possível encontrar este usuário',
  CATEGORY_ALREADY_EXISTS: 'Desculpe, esta categoria já existe',
  PRODUCT_ALREADY_EXISTS: 'Desculpe, este produto já está cadastrado',
  CATEGORY_NOT_FOUND: 'Desculpe, categoria não encontrada',
  PRODUCT_NOT_FOUND: 'Desculpe, produto não encontrado',
  ORDER_NOT_FOUND: 'Desculpe, pedido não encontrado',
  ORDER_ITEM_NOT_FOUND: 'Desculpe, item do pedido não encontrado',
  UNAUTHORIZED: 'Desculpe, você não tem uma conta ou sua sessão expirou',
  FORBIDDEN: 'Desculpe, você não tem permissão para realizar esta ação',
  BAD_REQUEST: 'Desculpe, não foi possível processar a requisição',
  INTERNAL_SERVER_ERROR:
    'Desculpe, ocorreu um erro interno. Tente novamente mais tarde',
  JWT_ERROR: 'Desculpe, sua sessão é inválida ou expirou',
  VALIDATION_ERROR: 'Desculpe, alguns dados informados são inválidos',
} as const;

export type ApiErrorCodeType = keyof typeof API_ERROR_MESSAGES;
