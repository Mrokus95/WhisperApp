import React from 'react'

const Message = () => {
    return (
        <div className="chat chat-end">
            <div className="chat-image avatar">
                <div className="mask mask-hexagon w-10">
                    <img alt="user avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            </div>
            <div className="chat-bubble">It was said that you would, destroy the Sith, not join them.</div>
            <div className="chat-footer">
                <time className="text-xs opacity-50">Send 12:45</time>
            </div>
        </div>
    )
}

export default Message