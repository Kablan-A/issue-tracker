import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ISSUES_PRIORITY, type Issue } from '@/lib/types';
import { ISSUES_PRIORITY_LABEL } from '@/lib/constants';

type IssuesFormData = Pick<Issue, 'title' | 'priority' | 'description' | 'assignee'>;

type IssuesAddDialogProps = {
  status: Issue['status'];
  onAddIssue: (issue: Issue) => void;
};

export function IssuesAddDialog({ status, onAddIssue }: IssuesAddDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<IssuesFormData | null>(null);

  const handleFormChange = (e: React.ChangeEvent<HTMLFormElement, Element>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ [name]: value } as IssuesFormData);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData) return;

    const newIssue: Issue = {
      id: Date.now().toString(),
      title: formData.title,
      priority: formData.priority,
      description: formData.description || '',
      assignee: formData.assignee || '',
      status,
      createdAt: new Date().toISOString(),
    };
    onAddIssue(newIssue);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<Button variant="ghost">Add an Issue</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>What's the issue?</DialogTitle>
        </DialogHeader>
        <form onChange={handleFormChange} onSubmit={handleSubmit}>
          <label>
            Title
            <input required id="issueTitle" name="title" />
          </label>
          <label>
            Priority
            <select required id="issuePriority" name="priority">
              {ISSUES_PRIORITY.map((priority) => (
                <option key={priority} value={priority}>
                  {ISSUES_PRIORITY_LABEL[priority]}
                </option>
              ))}
            </select>
          </label>
          <label>
            Description
            <input id="issueDescription" name="description" />
          </label>
          <label>
            Assignee
            <input id="issueAssignee" name="assignee" />
          </label>

          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
