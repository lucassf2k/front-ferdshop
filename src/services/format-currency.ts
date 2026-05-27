export const currencyFormatter = {
  brl: new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }),

  toReal(value: number): string {
    return this.brl.format(value);
  },

  formatInput(value: string): string {
    const digitsOnly = value.replace(/\D/g, '');

    const amount = Number(digitsOnly) / 100;

    return this.brl.format(amount);
  },

  parseToNumber(value: string): number {
    const digitsOnly = value.replace(/\D/g, '');

    return Number(digitsOnly) / 100;
  },
};
