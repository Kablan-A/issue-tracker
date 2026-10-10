import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Issue } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { ISSUES_PRIORITY } from '@/lib/constants';

export type IssuesCardProps = Issue;

export function IssuesCard({ title, priority, description, assignee }: IssuesCardProps) {
  const { variant: priorityVariant, label: priorityLabel } = ISSUES_PRIORITY[priority];
  const assigneeInitial = assignee ? assignee[0].toUpperCase() : 'N/A';

  return (
    <Card>
      <CardHeader className="gap-2">
        <div className="flex items-center gap-4">
          <Badge variant="outline">{assigneeInitial}</Badge>
          <CardTitle>{title}</CardTitle>
        </div>
        <Badge variant={priorityVariant}>{priorityLabel}</Badge>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
