import PropTypes from "prop-types"

export const Input = ({placeholder, value, onChange}) => {
  return (
      <>
        <input 
            type="text" 
            placeholder={placeholder}
            required 
            value={value} 
            onChange={onChange}
            className='m-2 p-2 border border-purple-400 rounded-2xl'
        />
      </>
  )
}

Input.propTypes = {
  placeholder: PropTypes.string.optional,
  value: PropTypes.string.optional,
  onChange: PropTypes.func.isRequired
}
