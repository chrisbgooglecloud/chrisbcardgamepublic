import React, { useEffect, useState } from 'react';

interface DamageEffectProps {
    value: number;
    x: number;
    y: number;
    color?: string;
    onComplete: () => void;
}

export const DamageEffect: React.FC<DamageEffectProps> = ({ value, x, y, color = 'text-red-500', onComplete }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onComplete();
        }, 2000); // Animation duration

        return () => clearTimeout(timer);
    }, [onComplete]);

    if (!visible) return null;

    return (
        <div
            className={`fixed pointer-events-none z-50 font-black text-4xl drop-shadow-md animate-float-up ${color}`}
            style={{ left: x, top: y }}
        >
            {value}
        </div>
    );
};
