'use client'

import { useRouter } from 'next/navigation'
import { FaFeather } from 'react-icons/fa'

interface SidebarTweetButton {}

export const SidebarTweetButton: React.FC<SidebarTweetButton> = () => {
   const router = useRouter()

   return (
      <div onClick={() => router.push('/')}>
         <div
            className="lg:hidden
               mt-6
               rounded-full
               h-14
               W-14
               p-4
               flex
               items-center
               justify-center
               bg-sky-500
               hover:bg-opacity-80
               transition
               cursor-pointer"
         >
            <FaFeather size={24} color="white" />
         </div>

         <div
            className="hidden
               lg:block
               px-4
               mt-6 
               py-2
               rounded-full
               bg-sky-500
               hover:bg-opacity-90
               cursor-pointer"
         >
            <p
               className="hidden
                  lg:block
                  text-center
                  font-semibol
                  text-white
                  text-[20px]"
            >
               Tweet
            </p>
         </div>
      </div>
   )
}
