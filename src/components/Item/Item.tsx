export type ItemProps = {
  value: number;
  color: string;
  x: number;
  y: number;
  size: "sm" | "md" | "lg";
};

export function Item(props: ItemProps) {
  return <h1>{props.value}</h1>;
}
