import type {Card} from "./cards.ts";
import {select as multiselect} from "inquirer-select-pro";
import {buildCardMultiSelectOptions} from "../helpers/cards.ts";

export class CardSelectionBuilder {

    private _goldCards: Card[] = [];
    private _talismanCards: Card[] = [];
    private _weaponCards: Card[] = [];
    private _totemCards: Card[] = [];
    private _alliedCards: Card[] = [];

    setGoldCards(value: Card[]): this {
        this._goldCards = value;
        return this;
    }

    setTalismanCards(value: Card[]): this {
        this._talismanCards = value;
        return this;
    }

    setWeaponCards(value: Card[]): this {
        this._weaponCards = value;
        return this;
    }

    setTotemCards(value: Card[]): this {
        this._totemCards = value;
        return this;
    }

    setAlliedCards(value: Card[]): this {
        this._alliedCards = value;
        return this;
    }

    async build() {
        return {
            golds: await multiselect(buildCardMultiSelectOptions(this._goldCards)),
            talismans: await multiselect(buildCardMultiSelectOptions(this._talismanCards)),
            weapons: await multiselect(buildCardMultiSelectOptions(this._weaponCards)),
            totems: await multiselect(buildCardMultiSelectOptions(this._totemCards)),
            allied: await multiselect(buildCardMultiSelectOptions(this._alliedCards)),
        }
    }
}