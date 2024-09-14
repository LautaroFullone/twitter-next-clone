import useUser from '@/hooks/useUser'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

interface AvatarProps {
   userId: string
   isLarge?: boolean
   hasBorder?: boolean
}

export const Avatar: React.FC<AvatarProps> = ({
   userId,
   isLarge,
   hasBorder,
}) => {
   const router = useRouter()
   const { user } = useUser(userId)

   const onClick = useCallback(
      (evt: any) => {
         evt.stopPropagation()
         router.push(`users/${userId}`)
      },
      [router, userId]
   )

   return (
      <div
         className={`
            rounded-full
            hover:opacity-90
            transition
            cursor-pointer
            relative
            ${hasBorder ? 'border-4 border-black' : ''} 
            ${isLarge ? 'h-32' : 'h-12'} 
            ${hasBorder ? 'w-32' : 'w-12'} 
      `}
      >
         <Image
            fill
            alt="Avatar"
            onClick={onClick}
            src={user?.profileImage || '/images/user-placeholder.jpg'}
            style={{
               objectFit: 'cover',
               borderRadius: '100%',
            }}
         />
      </div>
   )
}
