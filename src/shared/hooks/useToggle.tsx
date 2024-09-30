'use client';

import { useState } from "react";

const useToggle = (initialVal?: boolean): [
    active: boolean,
    toggle: (val?: boolean) => void
] => {
    const [ active, setActive ] = useState(initialVal || false)
    function toggle(val?: boolean) {
        if(typeof val === 'boolean') {
            setActive(val);
        }
        setActive(!active);
    }
    return [ active, toggle ]
}

export default useToggle;