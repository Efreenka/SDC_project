import { useState, useEffect, useRef } from 'react';

// https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
export default function useShowForm(initialShowForm) {
    const [showForm, setShowForm] = useState(initialShowForm);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setShowForm(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return { ref, showForm, setShowForm };
}
