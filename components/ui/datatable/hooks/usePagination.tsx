import type { PaginationState } from '@tanstack/react-table';
import { Dispatch, useState } from 'react';

export const usePagination = (): {
    setPagination: Dispatch<React.SetStateAction<PaginationState>>;
    pagination: PaginationState;
} => {

    const [pagination, setPagination] = useState<PaginationState>({
        pageSize: 10,
        pageIndex: 0,
    });

    return {
        pagination,
        setPagination
    };
}