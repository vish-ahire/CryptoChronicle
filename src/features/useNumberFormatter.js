import { useCallback } from "react";

const useNumberFormatter = () => {
    const formatNumber = useCallback((number, decimalPlaces = 3) => {
        if (number >= 1e12)
            return (number / 1e12).toFixed(decimalPlaces) + "T";
        else if (number >= 1e9)
            return (number / 1e9).toFixed(decimalPlaces) + "B";
        else if (number >= 1e6)
            return (number / 1e6).toFixed(decimalPlaces) + "M";
        else if (number >= 1e3)
            return (number / 1e3).toFixed(decimalPlaces) + "K";
        else
            return parseFloat(number).toFixed(decimalPlaces);
    }, []);

    return { formatNumber };
};

export default useNumberFormatter;
