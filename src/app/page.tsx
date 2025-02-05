import Link from "next/link";
import { db } from "~/server/db";
import { SignedOut, SignedIn } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

const images = await db.query.images.findMany({
  /* The model and an object of helpers is passed to the orderBy function,
  we use destructuring to get the desc helper from the list of helpers */
  orderBy: (model, { desc }) => desc(model.createdAt),
});

function Images() {
  return (
    <div className="flex flex-wrap gap-4">
      {[...images, ...images, ...images].map((image, i) => (
        <div key={image.id + "-" + i} className="flex w-48 flex-col">
          <img src={image.url} />
          <div>{image.name}</div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-2xl">Please sign in above</div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
