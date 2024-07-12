import { select, confirm } from '@inquirer/prompts';
import {deckOptions} from "./helpers/deck-options.ts";
import {DECK_OPTIONS} from "./enums/deck-options.ts";
import {getEditionsSelect} from "./helpers/editions.ts";
import {cardRulesMessage, getCardRulesByEdition, noCardRulesMessage} from "./helpers/card-rules.ts";
import type {CardRules} from "./models/card-rules.ts";
import {readJSONFile} from "./helpers/read-json.ts";
import {removeBannedCards} from "./helpers/cards.ts";
import type {CardResponse} from "./models/cards.ts";

const deckSelection = await select(await deckOptions())

if(+deckSelection === DECK_OPTIONS.BUILD_MY_DECK) {
    const selectedEdition = await select(await getEditionsSelect())
    const cardRules: CardRules | undefined = await getCardRulesByEdition(selectedEdition);
    const shouldCardRulesConfirm = await confirm({ message: cardRules ? cardRulesMessage(cardRules, selectedEdition) : noCardRulesMessage()})

    // TODO: Llamar endpoint para obtener las cartas por edicion, mientras se obtendrá el json
    const cardsByEdition: CardResponse = await readJSONFile('../stubs/cards-by-helenica-edition.json')
    cardsByEdition.cards = removeBannedCards(cardsByEdition.cards, cardRules);


}