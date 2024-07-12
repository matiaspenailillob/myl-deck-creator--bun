export const slugCardNameFormat = (cardName: string) => cardName.toLowerCase().replace(' ', '-')
export const setSlugCards = (cards: string[]) => cards.map(card => slugCardNameFormat(card));
