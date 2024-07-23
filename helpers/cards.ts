import {setSlugCards} from "../utils/cards.ts";
import type {CardRules} from "../models/card-rules.ts";
import type {Card} from "../models/cards.ts";
import {CARD_TYPES} from "../enums/card-types.ts";
import {multiSelectOptionsBuilder} from "../utils/options.ts";

export const removeBannedCards = (cards: Card[], {bannedCards}: CardRules) => {
    const bannedCardsSlugged = setSlugCards(bannedCards);
    return cards.filter(({slug}) => !bannedCardsSlugged.includes(slug))
}

export const buildCardMultiSelectOptions = (cards: Card[]) => {
    const message = 'Selecciona tus cartas';
    const options = cards.map(card => {
        return {
            name: card.name,
            value: card, // TODO: Averiguar si a lo mejor necesito todo el obj
            hint: card.ability
        }
    })

    return multiSelectOptionsBuilder({message, options})
}

export const getCardsByType = (cards: Card[], type: CARD_TYPES) => cards.filter(card => card.type === type)

export const isUniqueCard = ({ability}: Card) => ability?.toLowerCase().includes('carta única');

// TODO: WIP
export const multiplyCards = (cards: Card[], cardRules?: CardRules): Card[] => {
    // Inicializar el arreglo resultante
    const result: Card[] = [];

    if(!cardRules) {
        cards.forEach(card => {
            result.push(card, card, card);
        });

        return result;
    }

    const { oneCopyCards = [], twoCopyCards = [] } = cardRules;

    // Convertir las listas de cartas a sus slugs
    const oneCopyCardSlugged = setSlugCards(oneCopyCards);
    const twoCopyCardSlugged = setSlugCards(twoCopyCards);

    // Procesar cada carta
    cards.forEach(card => {
        // Si la carta está en oneCopyCards o es única, añadir una copia
        if (oneCopyCardSlugged.includes(card.slug) || isUniqueCard(card)) {
            result.push(card);
        }
        // Si la carta está en twoCopyCards, añadir dos copias
        else if (twoCopyCardSlugged.includes(card.slug)) {
            result.push(card, card);
        }
        // En cualquier otro caso, añadir tres copias
        else {
            result.push(card, card, card);
        }
    });

    return result;
};
