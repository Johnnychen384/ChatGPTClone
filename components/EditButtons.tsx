'use client';
import React from 'react'

type Props = {
    cancelEdit: () => void;
}

function EditButtons({ cancelEdit }: Props) {
  return (
    <div className='flex justify-center text-center mt-5'>
        <button type="submit" className='bg-[#11A37F] text-white hover:bg-[#11a37e5e] transition ease-in duration-200 rounded px-3 py-2 mr-4'>Save & submit</button>
        <button className='px-3 py-2' onClick={cancelEdit}>Cancel</button>
    </div>
  )
}

export default EditButtons