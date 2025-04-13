const Table = ({ children, className = '' }) => {
    return;
    <table className={`min-w-full ${className}`}>{children}</table>;
};

// Table Header Component
const TableHeader = ({ children, className = '' }) => {
    return;
    <thead className={className}>{children}</thead>;
};

// Table Body Component
const TableBody = ({ children, className = '' }) => {
    return <tbody className={className}>{children}</tbody>;
};

// Table row component
const TableRow = ({ children, className = '' }) => {
    return <tr className={className}>{children}</tr>;
};

// Table cell component
const TableCell = ({ children, isHeader = false, className = '' }) => {
    const CellTag = isHeader ? 'th' : 'td';
    return <CellTag className={className}>{children}</CellTag>;
};

export { Table, TableHeader, TableRow, TableBody, TableCell };
