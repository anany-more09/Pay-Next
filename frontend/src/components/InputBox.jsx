import PropTypes from "prop-types";

export const InputBox = ({ name = "", label, placeholder, onChange, type }) => {
  
  return <div>
    <div className="text-sm font-medium text-left py-2">
      {label}
    </div>
    <input name={name} type={type} onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200" />
  </div>
}

InputBox.propTypes = {

  name:        PropTypes.string.isRequired,
  label:       PropTypes.string.isRequired,  
  placeholder: PropTypes.string.isRequired,   
  onChange:    PropTypes.func.isRequired,
  type:        PropTypes.string.isRequired

}
