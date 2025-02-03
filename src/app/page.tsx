import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const mockUrls = [
  "https://hktcsccavm.ufs.sh/f/ufhDLWrGmIUJmPeZnxpoaCZdJNwtKSp2987hbBAn3UTqFjRP",
  "https://hktcsccavm.ufs.sh/f/ufhDLWrGmIUJDDclrvGjl8Wm6S2Mw5JoaitzLsEXUKkVerZq",
  "https://hktcsccavm.ufs.sh/f/ufhDLWrGmIUJFirz0qANH4DehoVTcKOx1m2tBk5UC69vi3Rj",
  "https://hktcsccavm.ufs.sh/f/ufhDLWrGmIUJfkvMkjRMCdv2S6QNb1iustFHLpJrKoRhEl35",
];

const mockImages = [...mockUrls, ...mockUrls, ...mockUrls].map(
  (url, index) => ({
    id: index + 1,
    url,
  }),
);

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  console.log(posts);

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {mockImages.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
