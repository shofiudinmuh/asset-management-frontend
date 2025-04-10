import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import PropTypes from 'prop-types';

const Label = ({ htmlFor, children, className }) => {
    return (
        <label
            htmlFor={htmlFor}
            className={clsx(twMerge('mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400', className))}>
            {children}
        </label>
    );
};

// prop types definition
Label.propTypes = {
    htmlFor: PropTypes.string,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Label;
