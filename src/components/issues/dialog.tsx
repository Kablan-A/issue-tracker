import { Badge } from '@/components/ui/badge';
import { ISSUES_PRIORITY_LABEL, ISSUES_PRIORITY_VARIANT } from '@/lib/constants';
import type { Issue } from '@/lib/types';

type IssuesDialogProps = Issue;

export function IssuesDialog({
  title,
  description,
  priority,
  assignee,
  createdAt,
}: IssuesDialogProps) {
  const assigneeInitial = assignee ? assignee[0].toUpperCase() : 'N/A';
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <Badge variant="outline">{assigneeInitial}</Badge>
        <h1 className="text-2xl">{title}</h1>
      </div>
      <div className="mb-5 flex items-center gap-4">
        <Badge variant={ISSUES_PRIORITY_VARIANT[priority]}>{ISSUES_PRIORITY_LABEL[priority]}</Badge>
        <p>{formattedDate}</p>
      </div>
      <p>{description}</p>
    </div>
  );
}
