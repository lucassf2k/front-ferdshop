import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/components/ui/table';
import { ScrollArea, ScrollBar } from '@/ui/components/ui/scroll-area';

type DataTableSkeletonProps = {
  columns?: number;
  rows?: number;
};

export const DataTableSkeleton = ({
  columns = 5,
  rows = 8,
}: DataTableSkeletonProps) => {
  return (
    <ScrollArea className="max-h-150 overflow-auto">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-white">
          <TableRow className="bg-muted/30">
            {Array.from({ length: columns }).map((_, index) => (
              <TableHead key={index} className="h-12 px-6">
                <div className="h-4 w-24 animate-pulse rounded bg-zinc-300" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex} className="even:bg-muted/20">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell
                  key={`${rowIndex}-${colIndex}`}
                  className="px-6 py-3"
                >
                  <div className="h-4 w-full animate-pulse rounded bg-zinc-200" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
