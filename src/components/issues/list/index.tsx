import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { IssuesListCard, type IssuesListCardProps } from '@/components/issues/list/card';
import { type Issue, type IssuesStatus } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IssuesAddDialog } from '@/components/issues/add-dialog';
import { IssuesDialog } from '@/components/issues/dialog';
import { ISSUES_STATUS_LABEL } from '@/lib/constants';

export type IssuesListProps = {
  status: IssuesStatus;
  list: Array<IssuesListCardProps>;
  onAddIssue: (issue: Issue) => void;
  onChangeIssue: (id: Issue['id'], issue: Partial<Issue>) => void;
};

export function IssuesList({ status, list, onAddIssue, onChangeIssue }: IssuesListProps) {
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
          <Dialog key={issue.id}>
            <DialogTrigger className="w-full rounded-xl">
              <IssuesListCard {...issue} />
            </DialogTrigger>
            <DialogContent>
              <IssuesDialog {...issue} onChangeIssue={onChangeIssue} />
            </DialogContent>
          </Dialog>
        ))}
      </CardContent>
      <CardFooter>
        <IssuesAddDialog status={status} onAddIssue={onAddIssue} />
      </CardFooter>
    </Card>
  );
}
