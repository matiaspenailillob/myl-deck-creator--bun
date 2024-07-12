import {confirm, select} from '@inquirer/prompts';
import {deckOptions} from "./helpers/deck-options.ts";
import {DECK_OPTIONS} from "./enums/deck-options.ts";
import {getEditionsSelect} from "./helpers/editions.ts";
import {cardRulesMessage, getCardRulesByEdition, noCardRulesMessage} from "./helpers/card-rules.ts";
import type {CardRules} from "./models/card-rules.ts";
import {readJSONFile} from "./helpers/read-json.ts";
import {getCardsByType, multiplyCards, removeBannedCards} from "./helpers/cards.ts";
import type {Card, CardResponse} from "./models/cards.ts";
import {CARD_TYPES} from "./enums/card-types.ts";

const deckSelection = await select(await deckOptions())

if(+deckSelection === DECK_OPTIONS.BUILD_MY_DECK) {
    const selectedEdition = await select(await getEditionsSelect())
    const cardRules: CardRules | undefined = await getCardRulesByEdition(selectedEdition);
    const shouldCardRulesConfirm = await confirm({ message: cardRules ? cardRulesMessage(cardRules, selectedEdition) : noCardRulesMessage()})

    // TODO: Llamar endpoint para obtener las cartas por edicion, mientras se obtendrá el json
    const cardsByEdition: CardResponse = await readJSONFile('../stubs/cards-by-helenica-edition.json')
    console.log('Cards by edition qty before:', cardsByEdition.cards.length);
    cardsByEdition.cards = removeBannedCards(cardsByEdition.cards, cardRules);
    console.log('Cards by edition qty after:', cardsByEdition.cards.length);

    const goldCards: Card[] = getCardsByType(cardsByEdition.cards, CARD_TYPES.ORO);
    console.log('Gold Cards qty before:', goldCards.length);
    // TODO: Separar por variable o pisar directamente?
    const goldCardsMultiplied = multiplyCards(goldCards, cardRules);
    console.log('Gold Cards qty after:', goldCardsMultiplied.length);



}