import React, { useState } from 'react'
import generatePassword from '../../helpers/generatePassword'

export function PasswordGenerator() {
    const [newPass, setNewPass] = useState('')
    const callGenerator = () => {
        console.log('kepanggil')
        setNewPass(generatePassword(5))
        console.log(generatePassword(5))
    }

    return (

        <div>
        {/* <form>
        <label>Pick your password length</label>
        <input type="radio" name="length" value="5">5</input><br/>
        <input type="radio" name="length" value="6">6</input><br/>
        <input type="radio" name="length" value="7">7</input>
        </form> */}
        <button onClick={ () => { callGenerator() }}>Generate your password</button>
        <p>Result</p>
        <h2>{newPass}</h2>
        <p>You can copy and paste the above password</p>
        </div>
    )
    
}

export default PasswordGenerator
