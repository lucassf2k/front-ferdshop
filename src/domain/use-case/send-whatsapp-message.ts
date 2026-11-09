import type { AppError } from '@/domain/shared/api-error';
import type { Result } from '@/domain/shared/result';

export type SendWhatsAppMessageInput = {
  message: string;
  allUsers: boolean;
  phoneNumber?: string;
};

export type SendWhatsAppMessageOutput = {};

export type SendWhatsAppMessage = (
  input: SendWhatsAppMessageInput,
) => Promise<Result<AppError, SendWhatsAppMessageOutput>>;
