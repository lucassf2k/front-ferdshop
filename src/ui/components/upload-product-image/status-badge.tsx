type StatusBadgeProps = {
  label: string;
  type: 'success' | 'error';
};

export const StatusBadge = ({ label, type }: StatusBadgeProps) => {
  const backgroundClass = type === 'success' ? 'bg-emerald-500' : 'bg-red-500';

  return (
    <div
      className={`absolute right-3 bottom-3 rounded-full px-3 py-1 text-sm font-medium text-white shadow-lg ${backgroundClass}`}
    >
      {label}
    </div>
  );
};
