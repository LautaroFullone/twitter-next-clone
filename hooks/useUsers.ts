import useSWR from 'swr'
import fetcher from '@/libs/fetcher'
import { User } from '@/models/User'

export default function useUsers() {
    const { data, error, isLoading, mutate } = useSWR('/api/users', fetcher)

    return {
        users: data as User[] || [],
        error,
        isLoading,
        mutate,
    }
}
