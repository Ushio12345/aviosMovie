import { useRef, useState } from "react";

const useInput = (initialValue = "") => {
    const [value, setValue] = useState(initialValue);
    const refValue = useRef(null);
    const getValue = () => refValue.current?.value || "";
    const onChangeValue = (e) => {
        setValue(e.target.value);
    };

    const resetValue = () => {
        setValue(initialValue);
        if (refValue.current) {
            refValue.current.value = initialValue;
        }
    };
    return {
        value,
        setValue,
        onChangeValue,
        resetValue,
        getValue,
        refValue,
        blind: {
            value,
            onChange: onChangeValue,
            refValue,
        },
    };
};
export default useInput;
