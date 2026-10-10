export type IssuesStatus = 'open' | 'in-progress' | 'closed';

export type IssuesPriority = 'low' | 'medium' | 'high';

export type Issue = {
  id: string;
  title: string;
  status: IssuesStatus;
  priority: IssuesPriority;
  description?: string;
  assignee?: string;
};
