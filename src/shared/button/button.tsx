import { EventHandlers } from 'shared/types';

import cn from './button.module.css';

const defaultTestId = 'button';

interface ButtonProps {
  content?: string;
  onClick: EventHandlers.Click;
  testId?: string;
}

function Button({ content, onClick, testId }: ButtonProps) {
  if (!content) {
    return null;
  }

  return (
    <button
      type="button"
      data-testid={`${testId || defaultTestId}`}
      className={cn.container}
      onClick={onClick}
    >
      <p className={cn.content}>{content}</p>
    </button>
  );
}

Button.defaultProps = {
  content: null,
  testId: null,
};

export default Button;
