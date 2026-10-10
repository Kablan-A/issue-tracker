export const ISSUES_STATUS = ['open', 'in-progress', 'closed'] as const;
export type IssuesStatus = (typeof ISSUES_STATUS)[number];

export const ISSUES_PRIORITY = ['low', 'medium', 'high'] as const;
export type IssuesPriority = (typeof ISSUES_PRIORITY)[number];

export type Issue = {
  id: string;
  title: string;
  status: IssuesStatus;
  priority: IssuesPriority;
  createdAt: string;
  description?: string;
  assignee?: string;
};
