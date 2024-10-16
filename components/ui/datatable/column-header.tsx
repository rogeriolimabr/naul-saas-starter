import { Button, Flex, Text } from '@chakra-ui/react'
import { Icon } from '@iconify-icon/react'
import { type Column } from '@tanstack/react-table'

interface ColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export default function ColumnHeader<TData, TValue>({
  column,
  title,
}: ColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <Text>{title}</Text>
  }

  const handleSort = () => {
    column.toggleSorting()
  }

  return (
    <Button
      as={Flex}
      variant='ghost'
      w='100%'
      fontSize={13}
      textTransform='uppercase'
      alignItems='center'
	  justifyContent='space-between'
      onClick={handleSort}
    >
      <Text>{title}</Text>
      {column.getIsSorted() === 'desc' ? (
        <Icon
          icon='eva:arrow-down-fill'
          width={14}
          height={14}
        />
      ) : column.getIsSorted() === 'asc' ? (
        <Icon
          icon='eva:arrow-up-fill'
          width={14}
          height={14}
        />
      ) : (
        <Icon
          icon='bxs:sort-alt'
          width={14}
          height={14}
        />
      )}
    </Button>
  )
}
