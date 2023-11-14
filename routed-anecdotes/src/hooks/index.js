import { useState } from 'react';

export const useField = (type, initialValue = '') => {
    const [value, setValue] = useState(initialValue);
    const onChange = (e) => {
        const { target } = e;
        setValue(target.value);
    };
    return { type, value, onChange };
};
