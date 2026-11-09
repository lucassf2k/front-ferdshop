import { api, type BaseApiSchema } from '@/api';
import type {
  SendWhatsAppMessage,
  SendWhatsAppMessageOutput,
} from '@/domain/use-case/send-whatsapp-message';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const sendWatsAppMessageService: SendWhatsAppMessage = async ({
  allUsers,
  message,
  phoneNumber,
}) => {
  const response = await api.post<BaseApiSchema<SendWhatsAppMessageOutput>>(
    'whatsapp/message',
    {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ allUsers, message, phoneNumber }),
    },
  );
  return unwrapResultBaseAPi(response);
};
