import {readJSONFile} from "./read-json.ts";
import type {CardRules} from "../models/card-rules.ts";

export const getCardRulesByEdition = async (edition: string): Promise<CardRules | undefined> => {

    const cardRules = await readJSONFile('../stubs/card-rules.json');
    const editionCardRules = cardRules[edition];

    if (!editionCardRules) return;

    return editionCardRules

}

export const cardRulesMessage = ({ bannedCards, oneCopyCards, twoCopyCards }: CardRules, edition: string) => {
    return ` 
        Para la edición ${edition} existen las siguientes reglas para estas cartas:
        Baneadas: ${bannedCards.join(', ')}.
        Solo una copia: ${oneCopyCards.join(', ')}.
        Solo dos copias: ${twoCopyCards.join(', ')}.

        Quieres continuar?
        `
}

export const noCardRulesMessage = () => {
    return `No existen reglas para esta edición, quieres continuar?`
}