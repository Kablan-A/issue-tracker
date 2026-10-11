import * as React from 'react';
import type { Issue } from '@/lib/types';
import { IssuesList } from '@/components/issues/list';

export function App() {
  const [openIssues, setOpenIssues] = React.useState<Issue[]>([]);
  const [inProgressIssues, setInProgressIssues] = React.useState<Issue[]>([]);
  const [closedIssues, setClosedIssues] = React.useState<Issue[]>([]);

  const handleAddIssue = (issue: Issue) => {
    switch (issue.status) {
      case 'open':
        setOpenIssues((prevIssues) => [...prevIssues, issue]);
        break;
      case 'in-progress':
        setInProgressIssues((prevIssues) => [...prevIssues, issue]);
        break;
      case 'closed':
        setClosedIssues((prevIssues) => [...prevIssues, issue]);
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-svh p-5">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-3 gap-5">
          <IssuesList status="open" list={openIssues} onAddIssue={handleAddIssue} />
          <IssuesList status="in-progress" list={inProgressIssues} onAddIssue={handleAddIssue} />
          <IssuesList status="closed" list={closedIssues} onAddIssue={handleAddIssue} />
        </div>
      </div>
    </div>
  );
}

export default App;
