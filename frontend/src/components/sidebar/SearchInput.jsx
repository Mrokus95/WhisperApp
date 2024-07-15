import React from 'react'
import { IoSearch } from "react-icons/io5";

const SearchInput = () => {
    return (
        <form className='flex items-center gap-2'>
            <input type="text" placeholder='Search...' className='input input-bordered rounded-full' />
            <button type='submit' className='btn btn-circle bg-green-500 text-white'><IoSearch className='w-6 h-6' /></button>
        </form>
    )
}

export default SearchInput