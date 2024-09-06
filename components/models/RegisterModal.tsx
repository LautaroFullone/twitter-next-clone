'use client'

import { useCallback, useState } from 'react'
import { Input } from '../Input'
import { Modal } from '../Modal'
import useLoginModalState from '@/hooks/useLoginModalState'
import useRegisterModalState from '@/hooks/useRegisterModalState'
import axios from 'axios'

export const RegisterModal = () => {
   const loginModalState = useLoginModalState()
   const registerModalState = useRegisterModalState()

   const [email, setEmail] = useState('')
   const [name, setName] = useState('')
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [isLoading, setIsLoading] = useState(false)

   const onToggle = useCallback(() => {
      if (isLoading) {
         return
      }

      registerModalState.onClose()
      loginModalState.onOpen()
   }, [isLoading, registerModalState, loginModalState])

   const onSubmit = useCallback(async () => {
      try {
         setIsLoading(true)

         await axios.post('/api/register', {
            email,
            password,
            username,
            name,
         })

         registerModalState.onClose()
      } catch (error) {
         console.log(error)
      } finally {
         setIsLoading(false)
      }
   }, [email, name, password, username, registerModalState])

   return (
      <Modal
         disabled={isLoading}
         isOpen={registerModalState.isOpen}
         title="Create an Account"
         actionLabel="Register"
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
                  placeholder="Name"
                  onChange={(evt) => setName(evt.target.value)}
                  value={name}
                  disabled={isLoading}
               />
               <Input
                  placeholder="Username"
                  onChange={(evt) => setUsername(evt.target.value)}
                  value={username}
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
                  Already have an account?{' '}
                  <span
                     onClick={onToggle}
                     className="text-white cursor-pointer hover:underline"
                  >
                     Sign In
                  </span>
               </p>
            </div>
         }
      />
   )
}
