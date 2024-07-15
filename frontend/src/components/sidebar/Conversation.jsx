import React from 'react'

const Conversation = () => {
    return (
        <div>
            <div className='flex gap-2 items-center hover:bg-green-500 rounded p-2 py-1 cursor-pointer'>
                <div className="avatar online">
                    <div className="mask mask-hexagon w-12">
                        <img alt="user avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <p className='font-bold text-gray-200'>Łukasz Mroczkowski</p>
                </div>
            </div>
            <div className='divider my-0 py-0 h-1'></div>
        </div>
    )
}

export default Conversation