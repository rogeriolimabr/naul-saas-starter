import type { SortingState } from '@tanstack/react-table';
import { Dispatch, useState } from 'react';

export const useSorting = (): {
    setSorting: Dispatch<React.SetStateAction<SortingState>>;
    sorting: SortingState;
} => {

    const [sorting, setSorting] = useState<SortingState>([{
        desc: true,
        id: 'createdAt'
    }]);

    return {
        sorting,
        setSorting
    };
}