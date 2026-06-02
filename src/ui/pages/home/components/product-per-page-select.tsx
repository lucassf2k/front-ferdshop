import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/ui/components/ui/select';

interface Props {
  value: number;
  onValueChange: (value: number) => void;
}

const OPTIONS = [5, 10, 20, 50] as const;

export const ProductPerPageSelect = ({ value, onValueChange }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-zinc-600">Produtos por página</span>

      <Select
        value={String(value)}
        onValueChange={(selectedValue) => {
          onValueChange(Number(selectedValue));
        }}
      >
        <SelectTrigger className="w-35">
          <SelectValue placeholder="Quantidade" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Quantidade</SelectLabel>
            {OPTIONS.map((option) => (
              <SelectItem key={option} value={String(option)}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
