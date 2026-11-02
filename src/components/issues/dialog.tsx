import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  ISSUES_PRIORITY_LABEL,
  ISSUES_PRIORITY_VARIANT,
  ISSUES_STATUS_LABEL,
} from '@/lib/constants';
import { ISSUES_STATUS, type Issue, type IssuesStatus } from '@/lib/types';

type IssuesDialogProps = Issue & {
  onChangeIssue: (id: Issue['id'], issue: Partial<Issue>) => void;
};

export function IssuesDialog({
  id,
  title,
  status,
  description,
  priority,
  assignee,
  createdAt,
  onChangeIssue,
}: IssuesDialogProps) {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
    const newStatus = e.target.value as IssuesStatus;
    onChangeIssue(id, { status: newStatus });
  };

  const assigneeInitial = assignee ? assignee[0].toUpperCase() : 'N/A';
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div>
      <div className="mb-3 flex items-center gap-4">
        <Badge variant="outline">{assigneeInitial}</Badge>
        <h1 className="text-2xl">{title || 'Somehow no title'}</h1>
      </div>
      <div className="mb-5 flex items-center gap-4">
        <Badge variant={ISSUES_PRIORITY_VARIANT[priority]}>{ISSUES_PRIORITY_LABEL[priority]}</Badge>
        <p>{formattedDate}</p>
        <label>
          Status:
          <select id="issueStatus" name="status" value={status} onChange={handleStatusChange}>
            {ISSUES_STATUS.map((status) => (
              <option key={status} value={status}>
                {ISSUES_STATUS_LABEL[status]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p>{description || 'No description'}</p>
    </div>
  );
}
