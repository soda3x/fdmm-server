// Fetch file and return contents as a string
export async function fetchFileContents(url: string): Promise<string> {
    try {
        const response = await fetch(url);
        const data = await response.text();
        return data;
    } catch (error) {
        return `Failed to fetch ${url}.`;
    }
}

// Given a newline separated string, choose a line at random and return it
export function choose(choices: string): string {
    let choicesCollection: string[] = choices.split('\n');
    const randomIndex = Math.floor(Math.random() * choicesCollection.length);
    return choicesCollection[randomIndex];
}