import PropTypes from 'prop-types';
import { FormEvent } from 'react';

const Form = ({ onSubmit, children, className }) => {
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                onSubmit(event);
            }}
            className={`${className}`}>
            {children}
        </form>
    );
};

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default Form;
