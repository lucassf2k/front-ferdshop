import { UserRoleEnum } from '@/domain/entities/user';
import { useUpdateUserRoleMutation } from '@/hooks/mutations/use-update-user-role-mutation';
import { useListUsersQuery } from '@/hooks/queries/use-list-users-query';
import { usePaginationMeta } from '@/hooks/use-pagination-meta';
import { usePaginationParams } from '@/hooks/use-pagination-params';
import { AppPagination } from '@/ui/components/app-pagination';
import { Button } from '@/ui/components/base-button';
import { DataTableSkeleton } from '@/ui/components/skeletons/data-table-skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/components/ui/dropdown-menu';
import { TableWrapper } from '@/ui/pages/dashboard/components/table-wrapper';
import { FaEllipsisH } from 'react-icons/fa';
import { UsersTable } from '@/ui/pages/dashboard/users/table';
import { useSearchParams } from 'react-router';

export const DashboardUsersPage = () => {
  const [searchParams] = useSearchParams();
  const { page, perPage } = usePaginationParams(searchParams);
  const { data: usersData, isPending: isListUsersPending } = useListUsersQuery({
    page,
    perPage,
  });

  const { mutate: updateUserRoleMutate, isPending: isUpdateUserRolePending } =
    useUpdateUserRoleMutation();

  const { totalPages } = usePaginationMeta({
    page: Number(page),
    perPage: Number(perPage),
    total: usersData?.total ?? 0,
  });

  if (!usersData) {
    return (
      <TableWrapper title="Usuários">
        <UsersTable users={[]} actionsComp={() => null} />
      </TableWrapper>
    );
  }

  const hasUsers = usersData.users.length > 0;
  const users = hasUsers ? usersData.users : [];

  const renderDropdownActionItem = (id: string, role: string) => {
    const isAdmin = role.toUpperCase() === UserRoleEnum.ADMIN;
    return (
      <DropdownMenuItem
        disabled={isUpdateUserRolePending}
        onClick={() =>
          updateUserRoleMutate({ id, role: isAdmin ? 'CUSTOMER' : 'ADMIN' })
        }
      >
        Mudar para {isAdmin ? 'cliente' : 'administrador'}
      </DropdownMenuItem>
    );
  };

  return (
    <TableWrapper title="Usuários">
      {isListUsersPending ? (
        <DataTableSkeleton />
      ) : (
        <>
          <UsersTable
            users={users}
            actionsComp={({ id, role }) => (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer"
                    isLoading={isUpdateUserRolePending}
                  >
                    <FaEllipsisH />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                    {renderDropdownActionItem(id, role)}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          />
          <AppPagination totalPages={totalPages} />
        </>
      )}
    </TableWrapper>
  );
};
