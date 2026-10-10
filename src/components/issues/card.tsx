import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Issue, IssuesPriority } from '@/lib/types';
import { Badge, badgeVariants } from '@/components/ui/badge';
import type { VariantProps } from 'class-variance-authority';
import { ISSUES_PRIORITY_LABEL } from '@/lib/constants';

export type IssuesCardProps = Issue;

export function IssuesCard({ title, priority, description, assignee }: IssuesCardProps) {
  const assigneeInitial = assignee ? assignee[0].toUpperCase() : 'N/A';

  return (
    <Card>
      <CardHeader className="gap-2">
        <div className="flex items-center gap-4">
          <Badge variant="outline">{assigneeInitial}</Badge>
          <CardTitle>{title}</CardTitle>
        </div>
        <Badge variant={ISSUES_PRIORITY_VARIANT[priority]}>{ISSUES_PRIORITY_LABEL[priority]}</Badge>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}

export const ISSUES_PRIORITY_VARIANT: Record<
  IssuesPriority,
  VariantProps<typeof badgeVariants>['variant']
> = {
  low: 'outline',
  medium: 'default',
  high: 'destructive',
};
