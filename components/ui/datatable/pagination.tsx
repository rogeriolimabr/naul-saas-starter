'use client';

import {
	ChevronLeftIcon,
	ChevronRightIcon
} from 'lucide-react';
import { type Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';


interface PaginationProps<TData> {
	table: Table<TData>;
}

export function Pagination<TData>({
	table
}: PaginationProps<TData>) {
	return (
		<div className="flex justify-between items-center space-x-2">
			<Button
				variant="outline"
				className="flex h-8 justify-between items-center"
				onClick={() => table.previousPage()}
				disabled={!table.getCanPreviousPage()}
			>

				<ChevronLeftIcon className="h-5 w-5 pr-2" />
				<span className='text-[13px]'>Atrás</span>
			</Button>

			<Button
				variant="ghost"
				className="flex h-8 justify-between items-center"
				disabled
			>
				Pág. {table.getState().pagination.pageIndex + 1} of {table.getPageCount() ?? 1}
			</Button>
			<Button
				variant="outline"
				className="flex h-8 justify-between items-center"
				onClick={() => table.nextPage()}
				disabled={!table.getCanNextPage()}
			>
				<span className="text-[13px]">
					Siguiente
				</span>
				<ChevronRightIcon className="h-5 w-5 pl-2" />
			</Button>

		</div>
	);
}
