import type { UserModel } from '@/domain/model/user';
import { DataTable } from '@/ui/components/data-table';
import { userColumns } from '@/ui/pages/dashboard/users/table/config';

interface Props {
  users: UserModel[];
  actionsComp: (user: UserModel) => React.ReactNode;
}

export const UsersTable = ({ users, actionsComp }: Props) => {
  const columns = userColumns({ actionsComp });

  return <DataTable columns={columns} data={users} />;
};
