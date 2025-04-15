export interface CardDTO {
  id: string;
  name: string;
  game: string;
  rarity: string;
  gamedata: Record<string, any> | null;
}
