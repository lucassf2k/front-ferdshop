import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/components/ui/select';
import { useSearchParams } from 'react-router';

const OPTIONS = [2, 5, 10, 20, 50] as const;

export const PerPageSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const perPage = Number(searchParams.get('perPage') ?? 10);

  const handleChangeSelected = (selectedValue: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('perPage', String(selectedValue));
    params.set('page', '1');
    setSearchParams(params);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-bold text-zinc-700">Items por página</span>

      <Select
        value={String(perPage)}
        onValueChange={(value) => {
          handleChangeSelected(value);
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
