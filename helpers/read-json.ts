import { promises as fs } from 'fs';

export const readJSONFile = async (path: string) => {
    const encode = 'utf8'
    const {pathname: root} = new URL(path, import.meta.url)
    // FIXME: Quitar este parche y revisar bien por que el path da problemas.
    const parche = root.slice(1)

    try {
        const data = await fs.readFile(parche, encode);
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (error) {
        console.error('Error reading the file', error)
        return;
    }
}