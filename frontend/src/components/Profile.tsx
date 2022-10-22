import React, { useState } from 'react'

const Profile = () => {

  const [clickBasicInfoEdit, setClickBasicInfoEdit] = useState(false)
  const [clickContactInfoEdit, setClickContactInfoEdit] = useState(false)

  const handleClickBasicInfoEdit = () => {
    setClickBasicInfoEdit(!clickBasicInfoEdit)
  }

  const handleClickContactInfoEdit = () => {
    setClickContactInfoEdit(!clickContactInfoEdit)
  }

  const BasicInfoEditForm = () => {
    return (
      <>
        <div className='mx-8 mt-4 flex flex-row'>
          <span className='text-2xl text-sky-700 font-bold w-[200px]'>User information</span>
          <svg onClick={handleClickBasicInfoEdit} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-3 mt-1 text-amber-400 hover:w-8 hover:h-8">
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
          </svg>
        </div>
        <div className='flex flex-col mx-8 my-2 justify-between'>
          <div className='flex flex-row my-2'>
            <span className='w-1 h-8 bg-sky-700 rounded-2xl mr-2'></span>
            <span className='text-xl w-[200px] text-sky-700 font-bold'>Name</span>
            <input className='text-xl text-stone-500 font-normal p-2 pl-4 enabled:bg-yellow-200 rounded-xl' type='text' value='Do Thai Son' />
          </div>
          <div className='flex flex-row my-2'>
            <span className='w-1 h-8 bg-sky-700 rounded-2xl mr-2'></span>
            <span className='text-xl w-[200px] text-sky-700 font-bold'>Gender</span>
            <input className='text-xl text-stone-500 font-normal p-2 pl-4 enabled:bg-yellow-200 rounded-xl' type='text' value='Male' />
          </div>
          <div className='flex flex-row my-2'>
            <span className='w-1 h-8 bg-sky-700 rounded-2xl mr-2'></span>
            <span className='text-xl w-[200px] text-sky-700 font-bold'>Date of Birth</span>
            <input className='text-xl text-stone-700 font-normal p-2 pl-4 enabled:bg-yellow-200 rounded-xl' type='date' />
          </div>
          <div className='flex flex-row my-2'>
            <span className='text-xl w-[200px] text-sky-700 font-bold ml-3'></span>
            <button className='text-xl text-stone-700 font-normal p-2 pl-4 bg-green-500 rounded-xl p-2 flex flex-row hover:bg-green-800 hover:text-white'>
              <span className=' mr-2 font-bold'>Submit</span>
            </button>
          </div>
        </div>
      </>
    )
  }

  const ContactInfoEditForm = () => {
    return (
      <>
        <div className='mx-8 mt-4 flex flex-row'>
          <span className='text-2xl text-sky-700 font-bold w-[200px]'>Contact</span>
          <svg onClick={handleClickContactInfoEdit} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-3 mt-1 text-amber-400 hover:w-8 hover:h-8">
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
          </svg>
        </div>
        <div className='flex flex-col mx-8 my-2 justify-between'>
          <div className='flex flex-row my-2'>
            <span className='w-1 h-8 bg-sky-700 rounded-2xl mr-2'></span>
            <span className='text-xl w-[200px] text-sky-700 font-bold'>Email</span>
            <input className='text-xl text-stone-500 font-normal p-2 pl-4 enabled:bg-yellow-200 rounded-xl' type='text' value='Do Thai Son' />
          </div>
          <div className='flex flex-row my-2'>
            <span className='w-1 h-8 bg-sky-700 rounded-2xl mr-2'></span>
            <span className='text-xl w-[200px] text-sky-700 font-bold'>Phone</span>
            <input className='text-xl text-stone-500 font-normal p-2 pl-4 enabled:bg-yellow-200 rounded-xl' type='text' value='Male' />
          </div>
          <div className='flex flex-row my-2'>
            <span className='w-1 h-8 bg-sky-700 rounded-2xl mr-2'></span>
            <span className='text-xl w-[200px] text-sky-700 font-bold'>Address</span>
            <input className='text-xl text-stone-700 font-normal p-2 pl-4 enabled:bg-yellow-200 rounded-xl' type='text' />
          </div>
          <div className='flex flex-row my-2'>
            <span className='text-xl w-[200px] text-sky-700 font-bold ml-3'></span>
            <button className='text-xl text-stone-700 font-normal p-2 pl-4 bg-green-500 rounded-xl p-2 flex flex-row hover:bg-green-800 hover:text-white'>
              <span className=' mr-2 font-bold'>Submit</span>
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className='flex flex-row p-4'>
      <div className='flex flex-row'>
        <div className='my-8 ml-8 mr-4 flex flex-row relative'>
          <img className='w-48 h-48 rounded-full' src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 absolute top-36 left-36 hover:h-10 hover:w-10 text-stone-800">
            <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
            <path fill-rule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
          </svg>

        </div>
        <div>
          {clickBasicInfoEdit ? <BasicInfoEditForm /> :
            <>
              <div className='mx-8 mt-4 flex flex-row'>
                <span className='text-2xl text-sky-700 font-bold w-[200px]'>User information</span>
                <svg onClick={handleClickBasicInfoEdit} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-3 mt-1 text-amber-400 hover:w-8 hover:h-8">
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                  <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </svg>
              </div>
              <div className='flex flex-col mx-8 my-2 justify-between'>
                <div className='flex flex-row my-2'>
                  <span className='w-1 h-8 bg-sky-700 rounded-2xl mr-2'></span>
                  <span className='text-xl w-[200px] text-sky-700 font-bold'>Name</span>
                  <span className='text-xl text-stone-500 font-normal'>DoThaiSon</span>
                </div>
                <div className='flex flex-row my-2'>
                  <span className='w-1 h-8 bg-sky-700 rounded-2xl mr-2'></span>
                  <span className='text-xl w-[200px] text-sky-700 font-bold'>Gender</span>
                  <span className='text-xl text-stone-500 font-normal'>Male</span>
                </div>
                <div className='flex flex-row my-2'>
                  <span className='w-1 h-8 bg-sky-700 rounded-2xl mr-2'></span>
                  <span className='text-xl w-[200px] text-sky-700 font-bold'>Date of Birth</span>
                  <span className='text-xl text-stone-700 font-normal'>14/08/2000</span>
                </div>
              </div></>
          }
          {clickContactInfoEdit ? <ContactInfoEditForm /> :
            <>
              <div className='mx-8 mt-8 flex flex-row'>
                <span className='text-2xl text-sky-700 font-bold w-[200px]'>Contact</span>
                <svg onClick={handleClickContactInfoEdit} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-3 mt-1 text-amber-400 hover:w-8 hover:h-8">
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                  <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </svg>
              </div>
              <div className='flex flex-col mx-8 my-2 justify-between'>
                <div className='flex flex-row my-2'>
                  <span className='w-1 h-8 bg-sky-700 rounded-2xl mr-2'></span>
                  <span className='text-xl w-[200px] text-sky-700 font-bold'>Email</span>
                  <span className='text-xl text-stone-700 font-normal'>son.dt1408@gmail.com</span>
                </div>
                <div className='flex flex-row my-2'>
                  <span className='w-1 h-8 bg-sky-700 rounded-2xl mr-2'></span>
                  <span className='text-xl w-[200px] text-sky-700 font-bold'>Phone</span>
                  <span className='text-xl text-stone-700 font-normal'>0937373590</span>
                </div>
                <div className='flex flex-row my-2'>
                  <span className='w-1 h-8 bg-sky-700 rounded-2xl mr-2'></span>
                  <span className='text-xl w-[200px] text-sky-700 font-bold'>Address</span>
                  <span className='text-xl text-stone-700 font-normal'>Tam Trinh, Hoang Mai, Ha Noi</span>
                </div>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Profile