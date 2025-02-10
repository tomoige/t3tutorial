import { getImage } from "~/server/queries";
import { Modal } from "./modal";

export default async function FullPageImageView(props: { id: number }) {
  const idAsNumber = Number(props.id);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  const image = await getImage(idAsNumber);
  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex flex-shrink justify-center">
        <img src={image.url} className="flex-shrink object-contain" />;
      </div>
      <div className="flex w-48 flex-shrink-0 flex-col border-l">
        <div className="text-xl font-bold">{image.name}</div>
      </div>
    </div>
  );
}
