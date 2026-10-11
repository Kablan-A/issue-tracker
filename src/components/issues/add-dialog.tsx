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
import { toast } from '@/components/ui/toast';

type IssuesAddDialogProps = {
  status: Issue['status'];
  onAddIssue: (issue: Issue) => void;
};

export function IssuesAddDialog({ status, onAddIssue }: IssuesAddDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const [formData, setFormData] = React.useState<IssuesFormData>(DEFAULT_FORM_DATA);
  const [formErrors, setFormErrors] = React.useState<Partial<Record<keyof IssuesFormData, string>>>(
    {}
  );

  const validateForm = (): boolean => {
    const newErrors = { ...formErrors };
    const { title, priority } = formData;

    const titleTrimmed = title.trim();
    if (!titleTrimmed) {
      newErrors.title = 'Title is required';
    } else {
      delete newErrors.title;
    }

    if (!ISSUES_PRIORITY.includes(priority)) {
      newErrors.priority = 'Invalid priority';
    } else {
      delete newErrors.priority;
    }

    setFormErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  function handleFieldChange<T extends HTMLInputElement | HTMLSelectElement>(
    e: React.ChangeEvent<T, T>
  ) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validatedData = validateForm();
    if (!validatedData) return;

    const newIssue: Issue = {
      ...formData,
      id: Date.now().toString(),
      status,
      createdAt: new Date().toISOString(),
    };

    onAddIssue(newIssue);
    setFormErrors({});
    setIsOpen(false);
    toast.add({
      type: 'success',
      title: 'Issue Added',
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      onOpenChangeComplete={() => setFormData(DEFAULT_FORM_DATA)}
    >
      <DialogTrigger render={<Button variant="ghost">Add an Issue</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>What's the issue?</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-5">
          <div>
            <label>
              Title <span className="text-destructive">*</span>
              <input
                id="issueTitle"
                name="title"
                value={formData.title}
                onChange={handleFieldChange}
              />
            </label>
            <p className="text-destructive">{formErrors.title}</p>
          </div>
          <div>
            <label>
              Priority <span className="text-destructive">*</span>
              <select
                required
                id="issuePriority"
                name="priority"
                value={formData.priority}
                onChange={handleFieldChange}
              >
                {ISSUES_PRIORITY.map((priority) => (
                  <option key={priority} value={priority}>
                    {ISSUES_PRIORITY_LABEL[priority]}
                  </option>
                ))}
              </select>
            </label>
            <p className="text-destructive">{formErrors.priority}</p>
          </div>
          <label>
            Description
            <input
              id="issueDescription"
              name="description"
              value={formData.description}
              onChange={handleFieldChange}
            />
          </label>
          <label>
            Assignee
            <input
              id="issueAssignee"
              name="assignee"
              value={formData.assignee}
              onChange={handleFieldChange}
            />
          </label>

          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

type IssuesFormData = Pick<Issue, 'title' | 'priority' | 'description' | 'assignee'>;
const DEFAULT_FORM_DATA: IssuesFormData = {
  title: '',
  priority: ISSUES_PRIORITY[0],
  description: '',
  assignee: '',
};
