const FileInput = ({ className = '', onChange }) => {
    return (
        <input
            type='file'
            className={`file-input h-11 w-full overflow-hidden rounded-lg border border-gray-300
            bg-transparent text-sm text-gray-500 shadow-theme-xs transition-colors focus:border-brand-300
            focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400
            ${className}`}
            onChange={onChange}
        />
    );
};

export default FileInput;
