import { select } from '@inquirer/prompts';
import {deckOptions} from "./helpers/deck-options.ts";
import {DECK_OPTIONS} from "./enums/deck-options.ts";

const deckSelection = await select(await deckOptions())
console.log(deckSelection)

if(+deckSelection === DECK_OPTIONS.BUILD_MY_DECK) {
    console.log('Opcion uno elegida')
}