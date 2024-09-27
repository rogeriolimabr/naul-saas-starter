import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Icon } from '@iconify-icon/react'

const GlobalSearch = () => {
  return (
    <InputGroup
      display={{ base: 'none', xl: 'block' }}
    >
      <InputLeftElement pointerEvents='none'>
        <Icon
          icon='ic:round-search'
          color='muted'
        />
      </InputLeftElement>
      <Input
        type='text'
        placeholder='Search...'
        _focusVisible={{ borderColor: 'brand' }}
      />
    </InputGroup>
  )
}

export default GlobalSearch
