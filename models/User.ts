export interface User {
   id: string
   name: string
   username: string
   bio: string
   email: string
   emailVerified: string
   image: string
   coverImage: string
   profileImage: string
   hashedPassword: string
   createdAt: string
   updatedAt: string
   followingIds: string[]
   hasNotification: boolean
}
