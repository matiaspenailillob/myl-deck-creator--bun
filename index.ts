import { select } from '@inquirer/prompts';
import {deckOptions} from "./helpers/deck-options.ts";

const deckSelection = await select(await deckOptions())
console.log(deckSelection)