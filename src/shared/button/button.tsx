import { EventHandlers } from 'shared/types';

import cn from './button.module.css';

interface ButtonProps {
    content?: string;
    onClick: EventHandlers.Click;
}

const Button = ({ content, onClick }: ButtonProps) => {
    if (!content) {
        return null;
    }

    return (
        <button className={cn.container} onClick={onClick}>
            <p className={cn.content}>{content}</p>
        </button>
    );
};

export default Button;
