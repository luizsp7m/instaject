import ReactLoading from "react-loading";

interface Props {
  width?: number;
  height?: number;
}

export function Loading({ width = 20, height = 20 }: Props) {
  return (
    <ReactLoading
      type="spin"
      height={height}
      width={width}
      color="#007fff"
    />
  );
}