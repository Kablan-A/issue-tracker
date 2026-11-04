import {
  ISSUES_PRIORITY,
  ISSUES_STATUS,
  type Issue,
  type IssuesPriority,
  type IssuesStatus,
  type LoadedIssue,
  type LoadedIssueErrors,
} from '@/lib/types';

export const LOCAL_ISSUES_KEY = 'issues';

const SAVED_ISSUES_ERRORS = {
  EMPTY: 'No saved issues found',
  NOT_ARRAY: 'The saved issues are invalid.',
  UNKNOWN: 'An unknown error occurred while retrieving issues',

  NO_ID: 'N/A',
  INVALID_ID: 'Invalid ID',

  NO_TITLE: 'Untitled issue',
  INVALID_TITLE: 'Title must be a string',

  NO_STATUS: 'No status',
  INVALID_STATUS: 'Status must be open, in-progress, or closed.',

  NO_PRIORITY: 'No priority',
  INVALID_PRIORITY: 'Priority must be low, medium, or high.',

  NO_CREATED_AT: 'No creation date',
  INVALID_CREATED_AT: 'Unknown creation date',

  INVALID_DESCRIPTION: 'Description must be a string',
  INVALID_ASSIGNEE: 'Assignee must be a string',
};

type LoadIssuesResponse = {
  loadedIssues: LoadedIssue[];
  errorMessage?: string;
};

export function loadLocalIssues(): LoadIssuesResponse {
  const issues = [];
  let errorMessage = '';

  try {
    const saved = localStorage.getItem(LOCAL_ISSUES_KEY);
    if (!saved) {
      throw new Error(SAVED_ISSUES_ERRORS.EMPTY);
    }

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) {
      throw new Error(SAVED_ISSUES_ERRORS.NOT_ARRAY);
    }

    for (const issue of parsed) {
      const validatedIssue = validateLocalIssue(issue);
      issues.push(validatedIssue);
    }
  } catch (error) {
    errorMessage = SAVED_ISSUES_ERRORS.UNKNOWN;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
  }

  return { loadedIssues: issues, errorMessage };
}

export function resetLocalIssues() {
  localStorage.setItem(LOCAL_ISSUES_KEY, JSON.stringify([]));
}

function validateLocalIssue(issue: unknown): LoadedIssue {
  const errors: LoadedIssueErrors = {};

  if (typeof issue !== 'object' || issue === null) {
    return {
      type: 'invalid',
      issue,
      errors,
    };
  }

  const value = issue as Record<string, unknown>;
  if (!('id' in value)) {
    errors.id = SAVED_ISSUES_ERRORS.NO_ID;
  } else if (typeof value.id !== 'string' || value.id.trim().length < 1) {
    errors.id = SAVED_ISSUES_ERRORS.INVALID_ID;
  }

  if (!('title' in value)) {
    errors.title = SAVED_ISSUES_ERRORS.NO_TITLE;
  } else if (typeof value.title !== 'string' || value.title.trim().length < 1) {
    errors.title = SAVED_ISSUES_ERRORS.INVALID_TITLE;
  }

  if (!('status' in value)) {
    errors.status = SAVED_ISSUES_ERRORS.NO_STATUS;
  } else if (!ISSUES_STATUS.includes(value.status as IssuesStatus)) {
    errors.status = SAVED_ISSUES_ERRORS.INVALID_STATUS;
  }

  if (!('priority' in value)) {
    errors.priority = SAVED_ISSUES_ERRORS.NO_PRIORITY;
  } else if (!ISSUES_PRIORITY.includes(value.priority as IssuesPriority)) {
    errors.priority = SAVED_ISSUES_ERRORS.INVALID_PRIORITY;
  }

  if (!('createdAt' in value)) {
    errors.createdAt = SAVED_ISSUES_ERRORS.NO_CREATED_AT;
  } else if (typeof value.createdAt !== 'string' || isNaN(Date.parse(value.createdAt))) {
    errors.createdAt = SAVED_ISSUES_ERRORS.INVALID_CREATED_AT;
  }

  if (value.description !== undefined && typeof value.description !== 'string') {
    errors.description = SAVED_ISSUES_ERRORS.INVALID_DESCRIPTION;
  }

  if (value.assignee !== undefined && typeof value.assignee !== 'string') {
    errors.assignee = SAVED_ISSUES_ERRORS.INVALID_ASSIGNEE;
  }

  if (Object.keys(errors).length > 0) {
    return { type: 'invalid', issue, errors };
  }

  return { type: 'valid', issue: value as Issue };
}

export function addIssueToLocal(issues: LoadedIssue[]) {
  localStorage.setItem(LOCAL_ISSUES_KEY, JSON.stringify(issues));
}
