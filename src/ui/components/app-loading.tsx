import logoImage from '@/ui/assets/logo.png';

export const AppLoading = () => {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="flex items-center justify-center">
        <img
          src={logoImage}
          alt="Logo escrito ferdshop em estado de carregamento..."
          className="h-44 w-44 animate-pulse object-contain drop-shadow-md"
        />
      </div>
    </div>
  );
};
