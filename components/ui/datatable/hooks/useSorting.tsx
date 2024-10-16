import type { SortingState } from '@tanstack/react-table';
import { Dispatch, useState } from 'react';

export const useSorting = (): {
    onSortingChange: Dispatch<React.SetStateAction<SortingState>>;
    sorting: SortingState;
} => {

    const [sorting, onSortingChange] = useState<SortingState>([{
        desc: true,
        id: 'createdAt'
    }]);

    return {
        sorting,
        onSortingChange
    };
}