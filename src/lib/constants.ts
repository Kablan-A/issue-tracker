import type { badgeVariants } from '@/components/ui/badge';
import type { IssuesPriority } from '@/lib/types';
import type { VariantProps } from 'class-variance-authority';

export const ISSUES_PRIORITY_LABEL: Record<IssuesPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const ISSUES_PRIORITY_VARIANT: Record<
  IssuesPriority,
  VariantProps<typeof badgeVariants>['variant']
> = {
  low: 'outline',
  medium: 'default',
  high: 'destructive',
};
