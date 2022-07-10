import Link from "next/link";

interface Props {
  image: string;
  username: string;
  email: string;
}

export function ProjectHeader({
  image,
  username,
  email
}: Props) {
  return (
    <div className="flex gap-4 items-center p-3">
      <img
        src={image}
        alt=""
        className="h-12 w-12 rounded-full object-cover"
      />

      <div className="flex flex-col gap-0">
        <h1 className="text-[0.925rem] font-medium">{username}</h1>

        <Link href={`/profile/${email}`}>
          <a className="text-[0.85rem] text-gray-400 hover:underline">
            {email}
          </a>
        </Link>
      </div>
    </div>
  );
}