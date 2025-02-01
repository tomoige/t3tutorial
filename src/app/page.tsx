import Link from "next/link";

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

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {mockImages.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
