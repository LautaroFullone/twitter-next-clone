'use client'

import useLoginModalState from '@/hooks/useLoginModalState'
import { useCallback, useState } from 'react'
import { Input } from '../Input'
import { Modal } from '../Modal'
import useRegisterModalState from '@/hooks/useRegisterModalState'

export const LoginModal = () => {
   const loginModalState = useLoginModalState()
   const registerModalState = useRegisterModalState()

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [isLoading, setIsLoading] = useState(false)

   const onToggle = useCallback(() => {
      if (isLoading) {
         return
      }

      loginModalState.onClose()
      registerModalState.onOpen()
   }, [isLoading, registerModalState, loginModalState])

   const onSubmit = useCallback(async () => {
      try {
         setIsLoading(true)

         // TODO: Login logic

         loginModalState.onClose()
      } catch (error) {
         console.log(error)
      } finally {
         setIsLoading(false)
      }
   }, [loginModalState])

   return (
      <Modal
         disabled={isLoading}
         isOpen={loginModalState.isOpen}
         title="Login"
         actionLabel="Sign In"
         onClose={loginModalState.onClose}
         onSubmit={onSubmit}
         body={
            <div className="flex flex-col gap-4">
               <Input
                  placeholder="Email"
                  onChange={(evt) => setEmail(evt.target.value)}
                  value={email}
                  disabled={isLoading}
               />
               <Input
                  placeholder="Password"
                  onChange={(evt) => setPassword(evt.target.value)}
                  value={password}
                  disabled={isLoading}
               />
            </div>
         }
         footer={
            <div className="text-neutral-400 text-center mt-4">
               <p>
                  First time usign Twitter?{' '}
                  <span
                     onClick={onToggle}
                     className="text-white cursor-pointer hover:underline"
                  >
                     Create an account
                  </span>
               </p>
            </div>
         }
      />
   )
}
