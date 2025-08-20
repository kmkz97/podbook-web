import { Badge } from "@/components/ui/badge";

interface StatusChipProps {
  status: 'processing' | 'completed' | 'failed';
}

const StatusChip = ({ status }: StatusChipProps) => {
  const variants = {
    completed: 'success',
    processing: 'warning',
    failed: 'destructive'
  } as const;

  return (
    <Badge variant={variants[status] || 'secondary'}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default StatusChip;
