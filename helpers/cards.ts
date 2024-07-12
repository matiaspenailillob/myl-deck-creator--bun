import {setSlugCards} from "../utils/cards.ts";
import type {CardRules} from "../models/card-rules.ts";
import type {Card} from "../models/cards.ts";

export const removeBannedCards = (cards: Card[], { bannedCards }: CardRules) => {
    const bannedCardsSlugged = setSlugCards(bannedCards);
    return cards.filter(({ slug }) => !bannedCardsSlugged.includes(slug))
}