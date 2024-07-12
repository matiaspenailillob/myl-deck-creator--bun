export interface CardResponse {
    status:   string;
    code:     number;
    races:    Race[];
    rarities: Race[];
    types:    Race[];
    keywords: Keyword[];
    edition:  Edition;
    cards:    Card[];
}

export interface Card {
    id:       string;
    edid:     string;
    slug:     string;
    name:     string;
    rarity:   string;
    race:     string;
    type:     string;
    keywords: string;
    cost:     string;
    damage:   string;
    ability:  string;
    flavour:  string;
    ed_edid:  string;
    ed_slug:  string;
}

export interface Edition {
    id:                string;
    order:             string;
    slug:              string;
    title:             string;
    image:             string;
    date_release:      Date;
    date_empire_valid: Date;
    custom_bg:         string;
    flags:             string;
}

export interface Keyword {
    id:         string;
    flag:       string;
    slug:       string;
    title:      string;
    alt_title:  string;
    definition: string;
}

export interface Race {
    id:   string;
    slug: string;
    name: string;
}
