import { Loader, LoaderCircle } from 'lucide-react';
import React, { useState } from 'react'
import LoadingCircle from './LoadingCircle';

const DeleteAlert = ({content, onDelete}) => {
    const [loading,setLoading] = useState(false);
    const handleDelete = async() => {

        setLoading(true);
        try{
            await onDelete();
        }finally{
            setLoading(false);
        }
    }
  return (
    <div>
      <p className='text-sm'>{content}</p>
      <div className='flex justify-end mt-6'>
        <button
            onClick={handleDelete}
            disabled={loading}
            type='button'
            className='py-2 px-3 bg-red-500 text-white rounded'>
            {loading ? (
                <>
                    <LoadingCircle className='h-6 w-6 animate-spin' /> 
                    Deleting...
                </>
            ):(
                <>
                    Delete
                </>
            )}
        </button>
      </div>
    </div>
  )
}

export default DeleteAlert
