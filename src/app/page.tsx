import Image from "next/image";
import { GameCard, Items } from "@/components/GameCard";
import { Item, ItemProps } from "@/components/Item";

type Card = Array<
  {
    key: string;
  } & ItemProps
>;

type Deck = Array<Card>;
const card: Card = [
  { key: crypto.randomUUID(), value: 12, color: "text-primary-foreground" },
];
export default function Home() {
  const items: Items = card.map((card) => (
    <Item key={crypto.randomUUID()} value={card.value} color={card.color} />
  ));
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <GameCard items={items} />
    </main>
  );
}
