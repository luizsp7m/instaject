interface Props {
  image: string;
}

export function ProjectImage({ image }: Props) {
  return (
    <div>
      <img
        src={image}
        alt=""
        className="w-full h-[186px] object-cover"
      />
    </div>
  );
}