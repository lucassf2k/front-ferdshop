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
    <div className="mt-5 flex items-center gap-2">
      <span className="text-sm font-bold text-zinc-700">
        Produtos por página
      </span>

      <Select
        value={String(value)}
        onValueChange={(selectedValue) => {
          onValueChange(Number(selectedValue));
        }}
      >
        <SelectTrigger className="w-35 max-w-48 border-blue-500 bg-white focus:ring-blue-500">
          <SelectValue placeholder="Quatidade" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {OPTIONS.map((option) => (
              <SelectItem
                key={option}
                value={String(option)}
                className="text-black"
              >
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
