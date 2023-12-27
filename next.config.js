/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'i.scdn.co'
			}
		]
	},
	transpilePackages: ['three']
}

module.exports = nextConfig
