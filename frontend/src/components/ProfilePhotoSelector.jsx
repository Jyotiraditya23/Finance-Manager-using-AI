import { Trash, Upload, User } from 'lucide-react';
import React, { useRef, useState } from 'react';

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };
  
  const handleRemoveImage = (e) => {
    e.preventDefault();
    setImage(null);
    setPreviewUrl(null);
  };
  
  const onChooseFile = (e) => {
    e.preventDefault();
    inputRef.current?.click();
  };
  
  return (
    <div className="flex justify-center mb-6">
      <input 
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      
      {!image ? (
        <div className="relative">
          {/* Profile placeholder circle */}
          <div className="w-24 h-24 flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 rounded-full border-4 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group" onClick={onChooseFile}>
            <User className="text-purple-600 group-hover:text-purple-700 transition-colors duration-200" size={40} />
          </div>
          
          {/* Upload button */}
          <button
            onClick={onChooseFile}
            className="absolute -bottom-1 -right-1 w-8 h-8 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 border-2 border-white"
          >
            <Upload size={16} />
          </button>
        </div>
      ) : (
        <div className="relative">
          {/* Profile image */}
          <img 
            src={previewUrl} 
            alt="profile photo" 
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg hover:shadow-xl transition-all duration-300 ring-2 ring-purple-200" 
          />
          
          {/* Remove button */}
          <button
            onClick={handleRemoveImage}
            className="absolute -top-1 -right-1 w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 border-2 border-white"
          >
            <Trash size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;