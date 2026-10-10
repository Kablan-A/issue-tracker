import * as React from 'react';
import type { Issue } from '@/lib/types';
import { IssuesList } from '@/components/issues/list';

export function App() {
  const [openIssues] = React.useState<Issue[]>([
    {
      id: '1',
      title: 'Issue 1',
      status: 'open',
      priority: 'medium',
      description: 'This is the first issue',
      assignee: 'John Doe',
    },
  ]);
  const [inProgressIssues] = React.useState<Issue[]>([]);
  const [closedIssues] = React.useState<Issue[]>([]);

  return (
    <div className="min-h-svh p-5">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-3 gap-5">
          <IssuesList status="open" list={openIssues} />
          <IssuesList status="in-progress" list={inProgressIssues} />
          <IssuesList status="closed" list={closedIssues} />
        </div>
      </div>
    </div>
  );
}

export default App;
