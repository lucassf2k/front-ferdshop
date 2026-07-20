import type { UserModel } from '@/domain/model/user';
import { formatter } from '@/ui/lib/formatters';
import type { ColumnDef } from '@tanstack/react-table';

export type UserDataTable = UserModel;

interface Props {
  actionsComp: (user: UserModel) => React.ReactNode;
}

export const userColumns = ({
  actionsComp,
}: Props): ColumnDef<UserDataTable>[] => {
  return [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Nome',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: 'Permissão',
      cell: ({ getValue }) => {
        const value = getValue<string>();
        return formatter.roleToUser(value);
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Criado em',
      cell: ({ getValue }) => {
        const value = getValue<string>();
        return formatter.date(value);
      },
    },
    {
      accessorKey: 'updatedAt',
      header: 'Atualizado em',
      cell: ({ getValue }) => {
        const value = getValue<string>();
        return formatter.date(value);
      },
    },
    {
      accessorKey: 'actions',
      header: 'Ações',
      cell: ({ row }) => {
        const user = row.original;
        return actionsComp(user);
      },
    },
  ];
};
