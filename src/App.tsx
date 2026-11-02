import * as React from 'react';
import type { Issue } from '@/lib/types';
import { IssuesList } from '@/components/issues/list';

export function App() {
  const [issues, setIssues] = React.useState<Issue[]>([]);

  const openIssues = issues.filter((issue) => issue.status === 'open');
  const inProgressIssues = issues.filter((issue) => issue.status === 'in-progress');
  const closedIssues = issues.filter((issue) => issue.status === 'closed');

  const handleAddIssue = (issue: Issue) => {
    setIssues((prev) => [...prev, issue]);
  };

  const handleChangeIssue = (id: Issue['id'], issue: Partial<Issue>) => {
    setIssues((prev) => prev.map((i) => (i.id === id ? { ...i, ...issue } : i)));
  };

  return (
    <div className="min-h-svh p-5">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-3 gap-5">
          <IssuesList
            status="open"
            list={openIssues}
            onAddIssue={handleAddIssue}
            onChangeIssue={handleChangeIssue}
          />
          <IssuesList
            status="in-progress"
            list={inProgressIssues}
            onAddIssue={handleAddIssue}
            onChangeIssue={handleChangeIssue}
          />
          <IssuesList
            status="closed"
            list={closedIssues}
            onAddIssue={handleAddIssue}
            onChangeIssue={handleChangeIssue}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
