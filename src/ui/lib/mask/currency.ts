export const currencyMask = (value: string) => {
  const numbers = value.replace(/\D/g, '');

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(numbers) / 100);
};
