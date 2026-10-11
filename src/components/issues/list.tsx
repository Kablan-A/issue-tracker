import { IssuesCard, type IssuesCardProps } from '@/components/issues/card';
import { type Issue, type IssuesStatus } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IssuesAddDialog } from '@/components/issues/add-dialog';

export type IssuesListProps = {
  status: IssuesStatus;
  list: Array<IssuesCardProps>;
  onAddIssue: (issue: Issue) => void;
};

export function IssuesList({ status, list, onAddIssue }: IssuesListProps) {
  const issuesCount = list.length;

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between gap-5">
          <CardTitle>{ISSUES_STATUS_LABEL[status]}</CardTitle>
          <Badge variant="ghost">{issuesCount}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {list.map((issue) => (
          <IssuesCard key={issue.id} {...issue} />
        ))}
      </CardContent>
      <CardFooter>
        <IssuesAddDialog status={status} onAddIssue={onAddIssue} />
      </CardFooter>
    </Card>
  );
}

const ISSUES_STATUS_LABEL: Record<IssuesStatus, string> = {
  open: 'Open',
  'in-progress': 'In Progress',
  closed: 'Closed',
};
