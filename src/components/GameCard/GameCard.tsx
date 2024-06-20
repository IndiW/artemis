import { Card } from "@/components/ui/card";
import { Item } from "../Item";

export type Items = Array<ReturnType<typeof Item>>;
type GameCardProps = {
  items: Items;
};
export function GameCard(props: GameCardProps) {
  return (
    <Card>
      <h1>My card</h1>
      {props.items}
    </Card>
  );
}
