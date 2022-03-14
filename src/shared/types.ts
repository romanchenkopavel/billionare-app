import { MouseEvent } from 'react';

export namespace EventHandlers {
    export interface Click {
        (event: MouseEvent<HTMLButtonElement>): void;
    }
}
