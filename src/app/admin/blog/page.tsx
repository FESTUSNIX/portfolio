import TypographyH1 from '@/components/ui/Typography/H1'
import { createClient } from '@/lib/supabase/server'
import { Post } from '@/types/collection'
import { notFound } from 'next/navigation'
import { columns } from '../components/PostsTable/columns'
import { DataTable } from '../components/PostsTable/data-table'

type Props = {}

const AdminBlogPage = async (props: Props) => {
	const supabase = createClient()
	const {
		data: { user }
	} = await supabase.auth.getUser()

	const { data, error } = await supabase
		.from('posts')
		.select(`*, categories(*)`)
		.order('created_at', { ascending: false })
		.match({ author_id: user?.id })
		.returns<Post[]>()

	if (!data || error || !data.length) return notFound()

	return (
		<div>
			<TypographyH1 className='mb-12'>Manage blog</TypographyH1>

			<div>
				{data?.length && data?.length > 0 ? (
					<>
						<DataTable data={data ? data : []} columns={columns} />
					</>
				) : (
					<p>No posts were found</p>
				)}
			</div>
		</div>
	)
}

export default AdminBlogPage
