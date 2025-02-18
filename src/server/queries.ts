// queries.ts makes it so that the getImages function is only available on the server, and not the client.
// This is because the db object is only available on the server.
// This is a good example of how to use server-only code in Next.js.
import "server-only";
//use server-only for code that should only run on the server
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { images } from "./db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getMyImages() {
  const user = await auth();

  if (!user.userId) throw new Error("Unauthorized");

  const images = await db.query.images.findMany({
    /* eq is a helper function that is passed to the where function,
    it checks if the userId of the image is equal to the userId of the user */
    where: (model, { eq }) => eq(model.userId, user.userId),
    /* The model and an object of helpers is passed to the orderBy function,
        we use destructuring to get the desc helper from the list of helpers */
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
  return images;
}

export async function getImage(id: number) {
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!image) throw new Error("Image not found");

  if (image.userId !== user.userId) throw new Error("Unauthorized");

  return image;
}

export async function deleteImage(id: number) {
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (image.userId !== user.userId) throw new Error("Unauthorized");

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  redirect("/");
}
