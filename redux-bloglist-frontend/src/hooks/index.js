import { useState } from 'react';

export const useField = (type, name) => {
    const [value, setValue] = useState('');
    const onChange = (e) => {
        const { target } = e;
        setValue(target.value);
    };
    const reset = () => setValue('');
    return {
        type,
        name,
        id: name,
        value,
        onChange,
        reset,
    };
};
