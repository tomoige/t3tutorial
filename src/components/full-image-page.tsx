import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/queries";
import { Modal } from "./modal";

export default async function FullPageImageView(props: { id: number }) {
  const idAsNumber = Number(props.id);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  const image = await getImage(idAsNumber);

  const client = await clerkClient();

  const uploaderInfo = await client.users.getUser(image.userId);

  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex flex-auto flex-shrink items-center justify-center">
        <img
          src={image.url}
          className="max-h-screen flex-shrink object-contain"
        />
        ;
      </div>
      <div className="flex w-48 flex-shrink-0 flex-col gap-2 border-l">
        <div className="border-b p-2 text-center text-lg">{image.name}</div>
        <div className="flex flex-col px-2">
          <span>Uploaded By:</span>
          <span>{uploaderInfo.fullName}</span>
        </div>
        <div className="flex flex-col px-2">
          <span>Created On:</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
