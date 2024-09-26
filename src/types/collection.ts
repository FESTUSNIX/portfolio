import { Database } from './supabase'

export type Category = Database['public']['Tables']['categories']['Row']
export type Post = Database['public']['Tables']['posts']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']

export interface PostWithCategory extends Omit<Post, 'categories'> {
	categories: Category
}

export interface PostWithCategoryWithProfile extends Omit<PostWithCategory, 'profiles'> {
	profiles: Profile
}

export interface CategoryWithPost extends Omit<Category, 'posts'> {
	posts: Post
}
