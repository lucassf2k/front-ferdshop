// pages/forbidden-page.tsx

import { ShieldX } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@/ui/components/ui/button';

export const ForbiddenPage = () => {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-6">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-6 rounded-full bg-amber-100 p-5 dark:bg-amber-500/10">
          <ShieldX className="h-14 w-14 text-amber-500" />
        </div>

        <h1 className="mb-2 text-4xl font-bold tracking-tight">403</h1>

        <h2 className="mb-3 text-xl font-semibold">Acesso negado</h2>

        <p className="text-muted-foreground mb-8 text-sm">
          Você não possui permissão para acessar esta página.
        </p>

        <Button asChild className="bg-amber-500 hover:bg-amber-600">
          <Link to="/">Voltar para início</Link>
        </Button>
      </div>
    </div>
  );
};
