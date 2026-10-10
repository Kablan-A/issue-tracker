import { IssuesCard, type IssuesCardProps } from '@/components/issues/card';
import type { IssuesStatus } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ISSUES_STATUS } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';

export type IssuesListProps = {
  status: IssuesStatus;
  list: Array<IssuesCardProps>;
};

export function IssuesList({ status, list }: IssuesListProps) {
  const issuesCount = list.length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-5">
          <CardTitle>{ISSUES_STATUS[status]}</CardTitle>
          <Badge variant="ghost">{issuesCount}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {list.map((issue) => (
          <IssuesCard key={issue.id} {...issue} />
        ))}
      </CardContent>
    </Card>
  );
}
