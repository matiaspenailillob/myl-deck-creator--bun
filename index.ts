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
import {CardSelectionBuilder} from "./models/card-selection-builder.ts";

const deckSelection = await select(await deckOptions())

if(+deckSelection === DECK_OPTIONS.BUILD_MY_DECK) {
    const selectedEdition = await select(await getEditionsSelect())
    const cardRules: CardRules | undefined = await getCardRulesByEdition(selectedEdition);
    const shouldCardRulesConfirm = await confirm({ message: cardRules ? cardRulesMessage(cardRules, selectedEdition) : noCardRulesMessage()})

    // TODO: Llamar endpoint para obtener las cartas por edicion, mientras se obtendrá el json
    const cardsByEdition: CardResponse = await readJSONFile('../stubs/cards-by-helenica-edition.json')
    // TODO: Validar si no vienen cartas por la edición.
    cardsByEdition.cards = removeBannedCards(cardsByEdition.cards, cardRules);

    const goldCards: Card[] = getCardsByType(cardsByEdition.cards, CARD_TYPES.ORO);
    const goldCardsMultiplied = multiplyCards(goldCards, cardRules);

    const talismanCards: Card[] = getCardsByType(cardsByEdition.cards, CARD_TYPES.TALISMAN);
    const talismanCardsMultiplied = multiplyCards(talismanCards, cardRules)

    const weaponCards: Card[] = getCardsByType(cardsByEdition.cards, CARD_TYPES.ARMA);
    const weaponCardsMultiplied = multiplyCards(weaponCards, cardRules)

    const totemCards: Card[] = getCardsByType(cardsByEdition.cards, CARD_TYPES.TOTEM);
    const totemCardsMultiplied = multiplyCards(totemCards, cardRules)

    const alliedCards: Card[] = getCardsByType(cardsByEdition.cards, CARD_TYPES.ALIADO);
    const alliedCardsMultiplied = multiplyCards(alliedCards, cardRules)

    const cardsSelectionsBuilder = await new CardSelectionBuilder()
        .setGoldCards(goldCardsMultiplied)
        .setTalismanCards(talismanCardsMultiplied)
        .setWeaponCards(weaponCardsMultiplied)
        .setTotemCards(totemCardsMultiplied)
        .setAlliedCards(alliedCardsMultiplied)
        .build();


    console.log('Cards Selection', cardsSelectionsBuilder);

}