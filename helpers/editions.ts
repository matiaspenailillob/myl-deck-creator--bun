import {readJSONFile} from "./read-json.ts";
import {optionsBuilder} from "../utils/options.ts";
import type {Options} from "../models/options.ts";

export const getEditionsSelect = async (): Promise<Options> => {
    const editionMessage = 'Elige tu edición con la cual quieres iniciar';
    const editionsData = await readJSONFile('../stubs/editions-pb.json')
    const editionsParams = {
        message: editionMessage,
        choices: editionsData
    }

    return optionsBuilder(editionsParams)
}