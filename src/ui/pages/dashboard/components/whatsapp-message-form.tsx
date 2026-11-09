import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import {
  WHATSAPP_MESSAGE_DEFAULT_VALUES,
  zodWhatsAppMessageFormScehma,
  type WhatsAppMessageFormSchema,
} from '@/schemas/whatsapp-message-form';
import { CardWithAnimate } from '../orders/components/card-with-animate';
import { FaWhatsapp } from 'react-icons/fa6';
import { BaseInput } from '@/ui/components/form/input';
import { CheckBoxWithLabel } from '../../payment/components/checkbox-with-label';
import { zodResolver } from '@hookform/resolvers/zod';
import { mask } from '@/ui/lib/mask';
import { Button } from '@/ui/components/base-button';

export const WhatsAppMessageForm = () => {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<WhatsAppMessageFormSchema>({
    resolver: zodResolver(zodWhatsAppMessageFormScehma),
    defaultValues: WHATSAPP_MESSAGE_DEFAULT_VALUES,
  });

  const phone = watch('phone');
  const message = watch('message');
  const allUsers = watch('allUsers');
  const whatsappFormIsValid = Boolean((phone || allUsers) && message);

  const handleSendWhatsappMessage: SubmitHandler<WhatsAppMessageFormSchema> = (
    data,
  ) => {
    console.log(data);
  };

  return (
    <section className="mb-6 rounded-xl border bg-white p-6 shadow-sm">
      <CardWithAnimate title="Notificação via Whatsapp">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600">
            <FaWhatsapp size={24} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Enviar notificação via WhatsApp
            </h2>

            <p className="text-sm text-gray-500">
              Envie uma mensagem diretamente para um cliente.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(handleSendWhatsappMessage)}
          className="space-y-4"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <BaseInput
                {...register('phone')}
                label="Número de whatsapp"
                labelClassName="text-[16px] text-gray-500"
                className="rounded-sm"
                placeholder="(00) 00000-0000"
                value={phone}
                onChange={(e) =>
                  setValue('phone', mask.phoneMask(e.target.value), {
                    shouldValidate: true,
                  })
                }
                disabled={allUsers}
                error={errors.phone?.message}
              />

              <Controller
                name="allUsers"
                control={control}
                render={({ field }) => (
                  <CheckBoxWithLabel
                    label="Todos os usuários"
                    labelClassName="text-[16px] text-gray-500"
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                  />
                )}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="notification-message"
                className="text-[16px] font-medium text-gray-700"
              >
                Mensagem
              </label>

              <textarea
                {...register('message')}
                id="notification-message"
                value={message}
                placeholder="Digite a mensagem que deseja enviar..."
                rows={3}
                maxLength={4096}
                className="flex w-full resize-none items-center justify-center rounded-sm border-3 border-blue-500 p-2 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/50"
                required
              />

              <p className="flex flex-col gap-2 text-right text-xs text-gray-400">
                {errors.message?.message && (
                  <span className="text-red-500">{errors.message.message}</span>
                )}
                {message.length}/4096 caracteres
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="cursor-pointer bg-green-500 hover:bg-green-600"
              disabled={!whatsappFormIsValid}
            >
              <span className="flex items-center gap-1">
                <FaWhatsapp className="mr-2" />
                Enviar notificação
              </span>
            </Button>
          </div>
        </form>
      </CardWithAnimate>
    </section>
  );
};
