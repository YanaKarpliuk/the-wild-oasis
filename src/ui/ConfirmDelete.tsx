import styled from 'styled-components';
import Button from './Button.tsx';
import Heading from './Heading.tsx';

type Props = {
  resourceName: string;
  onConfirm: () => void;
  onCloseModal?: () => void;
  disabled: boolean;
}

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

// onCloseModal comes from cloned children in Modal component.
function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }: Props) {
  return (
      <StyledConfirmDelete>
        <Heading as="h3">Delete {resourceName}</Heading>
        <p>
          Are you sure you want to delete this {resourceName} permanently? This
          action cannot be undone.
        </p>

        <div>
          <Button ariaLabel={'Cancel'}
                  $variation="secondary"
                  disabled={disabled}
                  onClick={onCloseModal}>
            Cancel
          </Button>
          <Button ariaLabel={'Delete'}
                  $variation="danger"
                  disabled={disabled}
                  onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
