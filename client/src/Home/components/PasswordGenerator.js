import React, { useState } from 'react'
import generatePassword from '../../helpers/generatePassword'

export function PasswordGenerator() {
    const [newPass, setNewPass] = useState('')
    const callGenerator = () => {
        console.log('kepanggil')
        setNewPass(generatePassword(6))
        console.log(generatePassword(6))
    }

    return (

        <div>
        <button data-testid="generatePassword" onClick={ () => { callGenerator() }}>Generate your password</button>
        {
            newPass && <h2 data-testid="result-password"> Result: {newPass}</h2>
        }
        <p>You can copy and paste the above password</p>
        </div>
    )
    
}

export default PasswordGenerator
