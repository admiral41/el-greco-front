import React from 'react'
import { Loader } from 'lucide-react'

function LoadingScreen() {
    return (
        <div className='fixed min-h-screen bg-white w-full  grid place-items-center top-0 left-0 z-50'>
            <div className='flex items-center gap-3'>
                {/* <img className='h-14 mb-2' src='/pabsonLogo.png' alt='loading'></img> */}
                <Loader className='animate-spin'/>
                <span className='uppercase text-xs font-bold animate-pulse'>Loading..</span>
            </div>
        </div>
    )
}

export default LoadingScreen