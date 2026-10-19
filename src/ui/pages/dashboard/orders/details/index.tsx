import { useParams } from 'react-router';
import { TableWrapper } from '../../components/table-wrapper';
import { CardWithAnimate } from '../components/card-with-animate';
import { FaBoxOpen, FaSquarePhone, FaUser } from 'react-icons/fa6';
import { IoIosMail } from 'react-icons/io';
import { CiUser } from 'react-icons/ci';
import { formatter } from '@/ui/lib/formatters';
import { useGetOrderOfIdQuery } from '@/hooks/queries/use-get-order-of-id-query';
import { useGetUserOfIdQuery } from '@/hooks/queries/use-get-user-of-id';
import { Spinner } from '@/ui/components/ui/spinner';
import { OrderStatusBadge } from '../components/order-status-badge';
import {
  DELIVERY_OPTION_CONFIG,
  PAYMENT_OPTION_CONFIG,
  PAYMENT_STATUS_CONFIG,
} from '@/constants/order';
import { UpdateOrderStatus } from '../components/update-order-status';
import { UpdateDeliveryOption } from '../components/update-delivery-option';
import { UpdatePaymentMethod } from '../components/update-payment-method';
import { OptionalValue } from '@/ui/components/optional-value';

type URLParams = {
  orderId: string;
};

export const DashboardOrderDetailsPage = () => {
  const { orderId } = useParams<URLParams>();
  const {
    data: order,
    isPending: isOrderPending,
    isError: isOrderError,
  } = useGetOrderOfIdQuery({
    id: orderId,
    enabled: Boolean(orderId),
  });
  const { data: user } = useGetUserOfIdQuery({
    id: order?.userId,
    enabled: Boolean(order?.userId),
  });

  if (isOrderPending) {
    return (
      <TableWrapper title="Pedido">
        <Spinner />
      </TableWrapper>
    );
  }

  if (isOrderError) {
    return (
      <TableWrapper title="Pedido">
        <p>Erro ao carregar o pedido.</p>
      </TableWrapper>
    );
  }

  if (!order) {
    return (
      <TableWrapper title="Pedido">
        <p>Pedido nao encontrado.</p>
      </TableWrapper>
    );
  }

  return (
    <TableWrapper title={`Pedido ID: ${orderId}`}>
      <div className="grid grid-cols-[70%_30%] gap-4 p-3">
        <div className="space-y-8">
          <CardWithAnimate title="Informações do pedido">
            <div className="flex flex-col gap-2 text-gray-600">
              <div className="flex flex-col gap-2 text-gray-600">
                {order.orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={`http://localhost:3001/files/${item.product.imageUrl}`}
                        alt={item.product.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p>Nome:</p>
                          <p>{item.product.name}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <p>Preço:</p>
                          <p>{formatter.currency(item.product.price)}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <p>Quantidade:</p>
                          <p>{item.quantity}</p>
                        </div>
                      </div>
                    </div>

                    <div className="text-end font-bold">
                      <p>Total</p>
                      <p>
                        {formatter.currency(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardWithAnimate>

          <CardWithAnimate title="Resumo do pedido">
            <OrderStatusBadge
              value={order.status}
              config={PAYMENT_STATUS_CONFIG}
            />

            <UpdateOrderStatus orderId={order.id} />

            <div className="mt-3 space-y-3 text-gray-600">
              <div className="flex items-center justify-between">
                <p>forma de pagamento</p>
                <div className="flex items-center gap-2">
                  <OrderStatusBadge
                    value={order.payment?.method ?? 'CASH'}
                    config={PAYMENT_OPTION_CONFIG}
                  />
                  <UpdatePaymentMethod orderId={order.id} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p>forma de entrega</p>
                <div className="flex items-center gap-2">
                  <OrderStatusBadge
                    value={order.deliveryOption!}
                    config={DELIVERY_OPTION_CONFIG}
                  />
                  <UpdateDeliveryOption orderId={order.id} />
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-gray-600">
              <div className="space-y-2">
                <p>Desconto</p>
                <p className="font-bold">Frete</p>
                <p>Subtotal</p>
              </div>

              <div className="space-y-2 self-end text-gray-600">
                <p>{formatter.currency(0)}</p>
                <p className="font-bold">{formatter.currency(0)}</p>
                <p>{formatter.currency(order.totalPrice ?? 0)}</p>
              </div>
            </div>
          </CardWithAnimate>

          <CardWithAnimate title="Timeline do pedido">
            <p className="text-gray-500">Sem timeline</p>
          </CardWithAnimate>
        </div>

        <div className="space-y-8 px-3">
          <CardWithAnimate title="Observações">
            <p className="text-gray-600">{order.notes ?? 'Sem observações'}</p>
          </CardWithAnimate>

          <CardWithAnimate title="Cliente">
            <div className="mt-2 flex items-center gap-2">
              <FaUser className="h-6 w-6 text-gray-600" />
              <p className="text-gray-600">{user?.name ?? 'Nao encontrado'}</p>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <FaBoxOpen className="h-6 w-6 text-gray-600" />
              <p className="text-gray-600">Quantidade de pedidos já feitos</p>
            </div>
            <p className="mt-4 text-gray-600">cliente desde de</p>
          </CardWithAnimate>

          <CardWithAnimate title="Contato do cliente">
            <div className="mt-2 flex items-center gap-2">
              <IoIosMail className="h-6 w-6 text-gray-600" />
              <p className="text-gray-600">{user?.email ?? 'Nao encontrado'}</p>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <FaSquarePhone className="h-6 w-6 text-gray-600" />
              <p className="text-gray-600">{order.customerPhone}</p>
            </div>
          </CardWithAnimate>

          <CardWithAnimate title="Endereço de entrega">
            <div className="mt-2 flex items-center gap-2">
              <CiUser className="h-6 w-6 text-gray-600" />
              <p className="text-gray-600">{order.customerName}</p>
            </div>
            <div className="mt-3 space-y-2">
              {order.deliveryAddress ? (
                <>
                  <p className="text-gray-600">
                    Endereço: <OptionalValue value={order.deliveryAddress} />
                  </p>
                  <p className="text-gray-600">
                    {' '}
                    N°: <OptionalValue value={order.addressNumber} />
                  </p>
                  <p className="text-gray-600">
                    Complemento: <OptionalValue value={order.complement} />
                  </p>
                  <p className="text-gray-600">
                    Referência: <OptionalValue value={order.reference} />
                  </p>
                  <a href="#" className="text-blue-500">
                    Ver no mapa
                  </a>
                </>
              ) : (
                <p className="text-gray-600">Retirada no local</p>
              )}
            </div>
          </CardWithAnimate>
        </div>
      </div>
    </TableWrapper>
  );
};
