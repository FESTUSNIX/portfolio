import { urlFor } from '@/lib/supabase'
import { AvatarProps } from '@radix-ui/react-avatar'
import { UserIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

type Props = {
	user: { name: string | null; image: string | null }
	getPublicUrl?: boolean
} & AvatarProps

const UserAvatar = ({ user, getPublicUrl = true, ...props }: Props) => {
	return (
		<Avatar {...props}>
			{user.image ? (
				<AvatarImage
					src={getPublicUrl ? urlFor('avatars', user.image).publicUrl : user.image}
					alt={`Zdjęcie profilowe ${user.name}`}
					referrerPolicy='no-referrer'
					className='relative aspect-square h-full w-full object-cover'
				/>
			) : (
				<AvatarFallback className='items-end'>
					<span className='sr-only'>{user.name}</span>
					<UserIcon className='mb-[-15%] h-full w-full fill-[#b3b3b3] text-[#b3b3b3] dark:fill-[#5c5c5c] dark:text-[#5c5c5c]' />
				</AvatarFallback>
			)}
		</Avatar>
	)
}

export default UserAvatar
