let cachedData: Array<JSON> | null = null;

export async function getJsObjects() {
    if (cachedData) {
        return cachedData;
    }

    // Otherwise, fetch the data
    // const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRBLSMgRmLCAmgG-IgsB5ISXD0kUmQD9kBebqqq8kRt0pvvjM6_hCAwGjp8x0BopzM8mHpebzSDYeZ6/pub?gid=684094629&single=true&output=tsv';

    // use this to build final version
    const url = '/public-quiz/configs/data.tsv';


    const response = await fetch(url);

    if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);

    const data = await response.text();

    const lines = data.trim().split('\n');

    const config = JSON.parse(lines[0]);
    const tresholds = JSON.parse(lines[1]);
    const questions = lines.slice(2).map(line => JSON.parse(line));

    // Cache the data
    cachedData = [config, tresholds, questions];

    // Return the fetched data
    return cachedData;
}

