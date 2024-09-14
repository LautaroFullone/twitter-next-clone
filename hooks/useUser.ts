import useSWR from 'swr'
import fetcher from '@/libs/fetcher'
import { User } from '@/models/User'

export default function useUser(userId: string) {
    const { data, error, isLoading, mutate } = useSWR('/api/users/'+userId, fetcher)

    return {
        user: data as User || null,
        error,
        isLoading,
        mutate,
    }
}
