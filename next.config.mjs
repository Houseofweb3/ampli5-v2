/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'ui-avatars.com',
          pathname: '/**', // allows all paths, or you can restrict to specific ones
        },
        {
          protocol: 'https',
          hostname: 'i.ibb.co',
          pathname: '/**', // allows all paths, or you can restrict to specific ones
        },
        {
          protocol: 'https',
          hostname: 'img.youtube.com',
          pathname: '/**', // allows all paths, or you can restrict to specific ones
        },
        {
          protocol: 'https',
          hostname: 'pbs.twimg.com',
          pathname: '/**', // allows all paths, or you can restrict to specific ones
        },
      ],
    }
};




export default nextConfig;
