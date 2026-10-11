import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import type { Issue } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { ISSUES_PRIORITY_LABEL, ISSUES_PRIORITY_VARIANT } from '@/lib/constants';

export type IssuesListCardProps = Issue;

export function IssuesListCard({ title, priority, assignee }: IssuesListCardProps) {
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
    </Card>
  );
}
