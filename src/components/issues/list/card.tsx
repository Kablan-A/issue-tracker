import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import type { Issue } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { ISSUES_PRIORITY_LABEL, ISSUES_PRIORITY_VARIANT } from '@/lib/constants';

export type IssuesListCardProps = Pick<Issue, 'title' | 'priority' | 'assignee'>;

export function IssuesListCard({ title, priority, assignee, ...props }: IssuesListCardProps) {
  const assigneeInitial = assignee ? assignee[0].toUpperCase() : 'N/A';

  return (
    <Card
      {...props}
      className="cursor-pointer transition-all hover:bg-muted dark:hover:bg-muted/50"
    >
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
