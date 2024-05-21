/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'i.scdn.co'
			},
			{
				hostname: 'randomuser.me'
			}
		]
	},
	transpilePackages: ['three']
}

module.exports = nextConfig
