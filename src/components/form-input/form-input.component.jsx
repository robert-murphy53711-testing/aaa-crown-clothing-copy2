import './form-input.styles.scss'

// GitHib Test
const FormInput = ({label, ...otherProps}) => {

    return (
        <div className='group'>
            <input className='form-input' {...otherProps}></input>

                <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
            
{/*             <input 
                type="password" 
                required 
                onChange={handleChange} 
                name="confirmedPassword"
                value={confirmedPassword}></input> */}
        </div>
    );
}

export default FormInput;