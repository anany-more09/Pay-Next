import PropTypes from "prop-types";

export const Button = ({ label, onClick }) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className="bg-gray-700 text-center rounded-lg p-1 px-2 mt-2 md:mt-0 text-white"
        >
            {label}
        </button>
    );
};

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};