import { useState } from 'react';

export const useField = (type, initialValue = '') => {
    const [value, setValue] = useState(initialValue);
    const onChange = (e) => {
        const { target } = e;
        setValue(target.value);
    };
    const reset = () => setValue('');
    return {
        type,
        value,
        onChange,
        reset,
    };
};
