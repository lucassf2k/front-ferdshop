interface Props {
  value: string | number | null | undefined;
}

export const OptionalValue = ({ value }: Props) => {
  const displayValue = value ?? '—';
  return <span className="text-gray-400">{displayValue}</span>;
};
