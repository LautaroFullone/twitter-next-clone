import useSWR from 'swr'
import fetcher from '@/libs/fetcher'
import { User } from '@/models/User'

export default function useCurrentUser() {
   const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher)

   return {
      currentUser: data as User,
      error,
      isLoading,
      mutate,
   }
}
