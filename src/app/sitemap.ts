/* eslint-disable no-unused-vars */
const getLastModified = async (path: string) => {
  return new Date();
};

export default async function sitemap() {
  const baseUrl = process.env.NEXTAUTH_URL;

  const paths = [
    "/",
    "/bounty",
    "/dashboard",
    "/dashboard/home",
    "/dashboard/cart",
    "/dashboard/checkout",
    "/checkout/complete",
    "/dashboard/profile",
    "/profile",
    "/dashboard/signup",
    "/signup",
    "/dashboard/redirectSignup",
    "/dashboard/redirect",
  ];

  const sitemapEntries = await Promise.all(
    paths.map(async (path) => {
      const lastModified = await getLastModified(path);
      return {
        url: `${baseUrl}${path}`,
        lastModified,
      };
    })
  );

  return sitemapEntries;
}
