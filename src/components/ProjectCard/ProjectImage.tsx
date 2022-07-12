import Link from "next/link";

interface Props {
  image: string;
  projectId: string;
}

export function ProjectImage({ image, projectId }: Props) {
  return (
    <div className="overflow-hidden">
      <Link href={`/projects/${projectId}`}>
        <a className="">
          <img
            src={image}
            alt=""
            className="w-full h-[220px] md:h-[186px] object-cover hover:scale-105 transition-transform"
          />
        </a>
      </Link>
    </div>
  );
}