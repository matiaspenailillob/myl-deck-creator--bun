export const normalizeCardName = (cardName: string): string => {
    return cardName
        .toLowerCase()                  // Convierte a minúsculas
        .normalize('NFD')               // Descompone caracteres con tilde
        .replace(/[\u0300-\u036f]/g, '')// Elimina marcas de diacríticos (acentos)
        .replace(/\s+/g, '-');          // Reemplaza espacios por guiones
}
export const setSlugCards = (cards: string[]) => cards.map(card => normalizeCardName(card));
