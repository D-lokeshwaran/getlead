'use client';

import { useState } from "react";

const useToggle = (initialVal: boolean= false): [
    active: boolean, 
    toggle: () => void
] => {
    const [ active, setActive ] = useState(initialVal)
    function toggle(val: boolean) {
        if(typeof val === 'boolean') {
            setActive(val);
        }
        setActive(!active);
    }
    return [ active, toggle ]
}

export default useToggle;