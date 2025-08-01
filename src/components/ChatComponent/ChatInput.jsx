import { useState } from 'react';

const ChatInput = ({ onSend }) => {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim()) {
            onSend(text.trim());
            setText('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="w-[55%] h-[7rem] fixed bottom-4 left-[35%] flex items-center gap-2 p-4 border-t border-gray-300 bg-white py-4">
            <input
                type="text"
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[6rem]"
            />
            <button
                onClick={handleSend}
                className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Send
            </button>
        </div>
    );
};

export default ChatInput;
