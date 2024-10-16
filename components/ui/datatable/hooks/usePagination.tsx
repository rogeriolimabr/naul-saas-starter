import type { PaginationState } from '@tanstack/react-table';
import { Dispatch, useState } from 'react';

export const usePagination = (): {
    onPaginationChange: Dispatch<React.SetStateAction<PaginationState>>;
    pagination: PaginationState;
} => {

    const [pagination, onPaginationChange] = useState<PaginationState>({
        pageSize: 10,
        pageIndex: 0,
    });

    return {
        pagination,
        onPaginationChange
    };
}