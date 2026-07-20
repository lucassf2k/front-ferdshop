import { CiSearch } from 'react-icons/ci';
import { Input } from '@/ui/components/ui/input';
import { Button } from '@/ui/components/ui/button';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export const SearchBar = ({ value, onChange, onSearch }: Props) => {
  return (
    <div className="w-full rounded-full border-2 border-transparent bg-white px-2 transition-colors focus-within:border-amber-500">
      <div className="flex h-14 w-full items-center gap-2">
        <span className="ml-4 flex h-6 w-6 items-center justify-center">
          <CiSearch className="h-6 w-6" />
        </span>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'enter') onSearch();
          }}
          placeholder="O que deseja pedir hoje?"
          className="h-full border-none text-[16px]! focus-visible:ring-0"
        />
        <Button
          size="lg"
          type="button"
          onClick={onSearch}
          className="cursor-pointer rounded-full bg-amber-500 font-bold transition-colors duration-500 hover:bg-amber-400"
        >
          Buscar
        </Button>
      </div>
    </div>
  );
};
