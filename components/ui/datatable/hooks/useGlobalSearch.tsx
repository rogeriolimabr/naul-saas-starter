import { Dispatch, useState } from 'react';

export const useGlobalSearch = (): {
    onGlobalSearchChange: Dispatch<React.SetStateAction<string | undefined>>;
    globalSearch: string | undefined;
} => {

    const [globalSearch, onGlobalSearchChange] = useState<string | undefined>();

    return {
        globalSearch,
        onGlobalSearchChange
    };
}