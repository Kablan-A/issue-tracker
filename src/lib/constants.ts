import type { badgeVariants } from '@/components/ui/badge';
import type { IssuesPriority, IssuesStatus } from '@/lib/types';
import type { VariantProps } from 'class-variance-authority';

export const ISSUES_STATUS: Record<IssuesStatus, string> = {
  open: 'Open',
  'in-progress': 'In Progress',
  closed: 'Closed',
};

export const ISSUES_PRIORITY: Record<
  IssuesPriority,
  {
    label: string;
    variant: VariantProps<typeof badgeVariants>['variant'];
  }
> = {
  low: {
    label: 'Low',
    variant: 'outline',
  },
  medium: {
    label: 'Medium',
    variant: 'default',
  },
  high: {
    label: 'High',
    variant: 'destructive',
  },
};
