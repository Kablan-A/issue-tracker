import { IssuesListCard, type IssuesListCardProps } from '@/components/issues/list/card';
import { type Issue, type IssuesStatus } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IssuesAddDialog } from '@/components/issues/add-dialog';
import { ISSUES_STATUS_LABEL } from '@/lib/constants';
import { Button } from '@/components/ui/button';

export type IssuesListProps = {
  status: IssuesStatus;
  list: Array<IssuesListCardProps>;
  onAddIssue: (issue: Issue) => void;
  onSelectIssue: (issue: Issue) => void;
};

export function IssuesList({ status, list, onAddIssue, onSelectIssue }: IssuesListProps) {
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
          <Button
            key={issue.id}
            render={(props) => <IssuesListCard {...issue} {...props} />}
            nativeButton={false}
            onClick={() => onSelectIssue(issue)}
          />
        ))}
      </CardContent>
      <CardFooter>
        <IssuesAddDialog status={status} onAddIssue={onAddIssue} />
      </CardFooter>
    </Card>
  );
}
