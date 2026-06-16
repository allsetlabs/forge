import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Confirmation,
  ConfirmationTitle,
  ConfirmationRequest,
  ConfirmationAccepted,
  ConfirmationRejected,
  ConfirmationActions,
  ConfirmationAction,
} from './confirmation';

const meta = {
  title: 'AI Elements/Confirmation',
  component: Confirmation,
  tags: ['autodocs'],
} satisfies Meta<typeof Confirmation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Request: Story = {
  args: {
    state: 'approval-requested',
  },
  render: () => (
    <Confirmation
      state="approval-requested"
      approval={{ id: '1', approved: undefined, reason: undefined }}
    >
      <ConfirmationTitle>Do you want to delete all files in the /temp directory?</ConfirmationTitle>
      <ConfirmationRequest>
        <ConfirmationActions>
          <ConfirmationAction variant="outline">Cancel</ConfirmationAction>
          <ConfirmationAction variant="destructive">Confirm</ConfirmationAction>
        </ConfirmationActions>
      </ConfirmationRequest>
    </Confirmation>
  ),
};

export const Accepted: Story = {
  args: {
    state: 'approval-responded',
  },
  render: () => (
    <Confirmation
      state="approval-responded"
      approval={{ id: '1', approved: true, reason: 'User approved the action' }}
    >
      <ConfirmationTitle>File deletion request</ConfirmationTitle>
      <ConfirmationAccepted>
        <p className="text-muted-foreground text-sm">Action approved by user</p>
      </ConfirmationAccepted>
    </Confirmation>
  ),
};

export const Rejected: Story = {
  args: {
    state: 'approval-responded',
  },
  render: () => (
    <Confirmation
      state="approval-responded"
      approval={{ id: '1', approved: false, reason: 'User cancelled the action' }}
    >
      <ConfirmationTitle>File deletion request</ConfirmationTitle>
      <ConfirmationRejected>
        <p className="text-muted-foreground text-sm">Action was cancelled</p>
      </ConfirmationRejected>
    </Confirmation>
  ),
};
