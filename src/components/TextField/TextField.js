import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const TextField = ({
  id,
  name,
  type,
  label,
  placeholder,
  isRequired,
  onChange,
}) => {
  return (
    <div className="text-field">
      <label className="text-field__label" htmlFor={id}>{label}</label>
      <input className="text-field__input" onChange={onChange} id={id} name={name} type={type} placeholder={placeholder} required={isRequired} />
    </div>
  );
};

export default TextField;

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

TextField.defaultProps = {
  placeholder: "",
};
