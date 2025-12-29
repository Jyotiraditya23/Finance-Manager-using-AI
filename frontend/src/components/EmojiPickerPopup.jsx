import React, { useState } from 'react'
import { Image, X } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleEmojiClick = (emoji) => {
    // emoji object from emoji-picker-react has a "emoji" (character) field
    onSelect(emoji?.imageUrl || emoji.emoji || ""); 
    setIsOpen(false); // ✅ close popup after selecting
  };

  return (
    <div className='flex flex-col md:flex-row items-start gap-5 mb-6'>
      <div
        onClick={() => setIsOpen(true)}
        className='flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity'
      >
        <div className='w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-purple-500 rounded-lg border-2 border-dashed border-purple-200 hover:border-purple-300 hover:bg-purple-100 transition-all duration-200'>
          {icon ? (
            <img src={icon} alt="Icon" className='w-8 h-8 object-contain' />
          ) : (
            <Image size={20} />
          )}
        </div>
        <p className='text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors'>
          {icon ? "Change icon" : "Pick icon"}
        </p>
      </div>
      
      {isOpen && (
        <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50'>
          <div className='relative bg-white rounded-lg shadow-2xl p-4 max-w-sm mx-4'>
            <button
              onClick={() => setIsOpen(false)}
              className='absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full shadow-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 z-10'
            >
              <X size={16} className='text-gray-600' />
            </button>
            
            <div className='mt-2'>
              <EmojiPicker
                open={isOpen}
                onEmojiClick={(emoji) => handleEmojiClick(emoji)}
                width={300}
                height={400}
                searchDisabled={false}
                skinTonesDisabled={true}
                previewConfig={{
                  defaultEmoji: "1f60a",
                  defaultCaption: "What's your mood?"
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
