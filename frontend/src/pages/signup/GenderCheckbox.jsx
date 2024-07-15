import React from 'react'

const GenderCheckbox = () => {
    return (
        <div className='flex justify-center'>
            <div className='form-control flex flex-row gap-4 pt-2'>
                <label className="label gap-2 cursor-pointer flex items-center">
                    <span className='label-text'>Male</span>
                    <input type="radio" name="gender" value="male" className='radio border-slate-300' />
                </label>
                <label className="label gap-2 cursor-pointer flex items-center">
                    <span className='label-text'>Female</span>
                    <input type="radio" name="gender" value="female" className='radio border-slate-300' />
                </label>
            </div>
        </div>
    )
}

export default GenderCheckbox