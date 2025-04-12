const { useState } = require('react');

const Switch = ({ label, defaultChecked = false, disabled = false, onChange, color = 'blue' }) => {
    const [isChecked, setIsChecked] = useState(defaultChecked);

    const handleToggle = () => {
        if (disabled) return;
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        onChange?.(newCheckedState);
    };

    const getSwitchColor = () => {
        const baseColors = {
            blue: {
                on: 'bg-brand-500',
                off: 'bg-gray-200 dark:bg-white/10',
            },
            gray: {
                on: 'bg-gray-800 dark:bg-white/10',
                off: 'bg-gray-200 dark:bg-white/10',
            },
        };
    };

    const colors = getSwitchColor();

    return (
        <label
            className={`swith-label flex cursor-pointer select-none items-center gap-3 text-sm font-medium ${
                disabled ? 'text-gray-400' : 'text-gray-700 dark:text-gray-400'
            }`}
            onClick={handleToggle}>
            {/* switch container */}
            <div className='relative'>
                {/* track */}
                <div
                    className={`switch-track block h-6 w-11 rounded-full transition-colors duration-150 ease-linear ${
                        disabled
                            ? 'bg-gray-100 pointer-events-none dark:bg-gray-800'
                            : colors.backgroud
                    }`}
                />
                {/* knob */}
                <div
                    className={`switch-knob absulute left-0.5 top-0.5 h-5 w-5 rounded-full shadow-theme-sm transition=transform duration-150 ease-linear ${colors.knob}`}></div>
                {/* label */}
                <span>{label}</span>
            </div>
        </label>
    );
};

export default Switch;
