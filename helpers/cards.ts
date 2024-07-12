import {setSlugCards} from "../utils/cards.ts";
import type {CardRules} from "../models/card-rules.ts";
import type {Card} from "../models/cards.ts";
import {CARD_TYPES} from "../enums/card-types.ts";
import {optionsBuilder} from "../utils/options.ts";

export const removeBannedCards = (cards: Card[], { bannedCards }: CardRules) => {
    const bannedCardsSlugged = setSlugCards(bannedCards);
    return cards.filter(({ slug }) => !bannedCardsSlugged.includes(slug))
}

export const getCardDetails = (cards: Card[]) => {
    const message = 'Selecciona tus cartas';
    const options = cards.map(card => {
        return {
            name: card.name,
            value: card.name, // TODO: Averiguar si a lo mejor necesito todo el obj
            hint: card.ability
        }
    })

    return optionsBuilder({ message, choices: options })

}

export const getCardsByType = (cards: Card[], type: CARD_TYPES) => cards.filter(card => card.type === type)

export const isUniqueCard = ({ ability }: Card) => ability?.toLowerCase().includes('carta única');

// TODO: WIP
export const multiplyCards = (cards: Card[], { oneCopyCards, twoCopyCards }: CardRules) => {
    const oneCopyCardSlugged = setSlugCards(oneCopyCards);
    const twoCopyCardSlugged = setSlugCards(twoCopyCards);

    return cards.reduce((acc, curr) => {

        if(oneCopyCardSlugged.includes(curr.slug) || isUniqueCard(curr)) {
            return acc.concat(curr)
        }

        if(twoCopyCardSlugged.includes(curr.slug)) {
            return acc.concat(curr, curr)
        }

        return acc.concat(curr, curr, curr)

    },[])
}