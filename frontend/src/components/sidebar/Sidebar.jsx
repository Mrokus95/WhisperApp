import React from 'react'
import SearchInput from "./SearchInput.jsx"
import Conversations from "./Conversations.jsx"
import LoggoutButton from './LoggoutButton.jsx'

const Sidebar = () => {
    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            <div className='flex items-center gap-2 h-15 p-2 pt-0 mb-0'><SearchInput /></div>
            <div className='divider  mb-0 mt-0'></div>
            <Conversations />
            <LoggoutButton />
        </div>
    )
}

export default Sidebar