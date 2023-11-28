import React from 'react'

interface ContainerProps {
    children: React.ReactNode
}

export const Container: React.FC<ContainerProps> = ({children}) => {
  return (
    <div className='p-6 my-8 mx-auto bg-white shadow-lg rounded-3xl w-[90vw]'>
        {children}
    </div>
  )
}
