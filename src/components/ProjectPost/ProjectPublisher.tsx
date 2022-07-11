import Link from "next/link";

import { User } from "../../types";

interface Props {
  user: User;
}

export function ProjectPublisher({ user }: Props) {
  return (
    <div className="flex gap-4 items-center border-b-[0.05rem] border-b-gray-700 p-4">
      <img
        src={user.image}
        alt=""
        className="h-12 w-12 rounded-full object-cover"
      />

      <div className="flex flex-col gap-0">
        <h1 className="text-[0.925rem] font-medium">{user.name}</h1>

        <Link href={`/profile/${user.email}`}>
          <a className="text-[0.85rem] text-gray-400 hover:underline">
            {user.email}
          </a>
        </Link>
      </div>
    </div>
  );
}