import * as React from 'react';
import type { Issue } from '@/lib/types';
import { IssuesList } from '@/components/issues/list';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { IssuesDialog } from '@/components/issues/dialog';

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

  const [selectedIssueId, setSelectedIssueId] = React.useState<Issue['id'] | null>(null);
  const selectedIssue = issues.find((i) => i.id === selectedIssueId);

  return (
    <div className="min-h-svh p-5">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-3 gap-5">
          <IssuesList
            status="open"
            list={openIssues}
            onAddIssue={handleAddIssue}
            onSelectIssue={setSelectedIssueId}
          />
          <IssuesList
            status="in-progress"
            list={inProgressIssues}
            onAddIssue={handleAddIssue}
            onSelectIssue={setSelectedIssueId}
          />
          <IssuesList
            status="closed"
            list={closedIssues}
            onAddIssue={handleAddIssue}
            onSelectIssue={setSelectedIssueId}
          />

          {selectedIssue && (
            <Dialog open={!!selectedIssue} onOpenChange={() => setSelectedIssueId(null)}>
              <DialogContent>
                <IssuesDialog {...selectedIssue} onChangeIssue={handleChangeIssue} />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
