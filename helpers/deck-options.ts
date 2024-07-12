import {readJSONFile} from "./read-json.ts";
import {optionsBuilder} from "../utils/options.ts";
import type {Options} from "../models/options.ts";

export const deckOptions = async (): Promise<Options> => {
    const personalOptionsData = await readJSONFile('../stubs/deck-options.json')
    const message = 'Que quieres hacer?';
    const personalQuestionParams = {
        message,
        choices: personalOptionsData
    }

    return optionsBuilder(personalQuestionParams)
}