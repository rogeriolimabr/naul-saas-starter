'use client';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { type Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Mixer } from '@/components/icons';

interface ViewOptionsProps<TData> {
	table: Table<TData>;
}

export function ViewOptions<TData>({
	table
}: ViewOptionsProps<TData>) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="lg"
					className="ml-auto hidden h-10 lg:flex"
				>
					<div className='mr-3 h-4 w-4'>
						<Mixer width={19} height={19} className='text-black' />
					</div>
					Visualizar
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[150px]">
				<DropdownMenuLabel>Control de columnas</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{table
					.getAllColumns()
					.filter(
						(column) =>
							typeof column.accessorFn !== 'undefined' &&
							column.getCanHide()
					)
					.map((column) => {
						return (
							<DropdownMenuCheckboxItem
								key={column.id}
								className="capitalize"
								checked={column.getIsVisible()}
								onCheckedChange={(value) =>
									column.toggleVisibility(Boolean(value))
								}
							>
								{column.id}
							</DropdownMenuCheckboxItem>
						);
					})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
