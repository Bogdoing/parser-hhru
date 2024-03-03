import { JSDOM } from 'jsdom';
import axios from 'axios';


function convertNumberString(numberString: string) {
    const numberMap: Record<string, number> = {
        'k': 1000,
        'M': 1000000,
        'B': 1000000000,
    };
  
    const numberRegex = /^(\d+(\.\d+)?)([kMB])?$/;
    const matches = numberString.match(numberRegex);

    if (matches) {
        const number = parseFloat(matches[1]);
        const unit = matches[3];
    
        if (unit) {
            const multiplier = numberMap[unit];
            return (number * multiplier).toString();
        }
    
        return number.toString();
    }

    return '';
}

/**
 * Fetches the number of GitHub repositories for a specific programming language.
 * @param {string} language - The programming language to search for.
 * @returns {Promise<{ count: string, lang: string }>} - An object containing the count of repositories and the language.
 */
const getLangGitHub = async (language: string): Promise<{ count: string; lang: string; }> => {
    try {
        const response: any = await axios.get(`https://github.com/search?q=language%3A${language}&type=repositories`,
        {
            headers: { 'Accept': 'text/html' }
        });
        const dom: any = new JSDOM(response.data);
        var linksElement: Element | null = dom.window.document.getElementsByClassName('Box-sc-g0xbh4-0 cgQapc')[0];
        var linksLength: string = linksElement ? linksElement.textContent || '' : '';
        
        return {
            count: linksLength,
            lang: language,
        };
    }
    catch (e) { 
        console.log('getLangGitHub Error - ' + language + ' | ' + e)
        return {
            count: '',
            lang: '',
        }
    }
}

function sleep(ms: number | undefined){ return new Promise(resolve => setTimeout(resolve, ms)); }

function currData(): string {
    const date = new Date();
    const month = date.getMonth() + 1;
    return `${date.getFullYear()}-${month}-${date.getDate()}`;
}

/**
 * Retrieves language counts from GitHub for the given languages.
 * @param lang_github - Array of language names to retrieve counts for.
 * @returns - Array of objects with count, language, and data properties.
 */
async function pars(lang_github: string[]): Promise<{count: string, lang: string, data: any}[]> {
    let result: {count: string, lang: string, data: any}[] = []
    for (let i = 0; i < lang_github.length; i++) {
        await sleep(1000)
        let getRes = await getLangGitHub(lang_github[i])
        while (!getRes || getRes.count == '') {
            await sleep(4000)
            //console.log('sleep' + i)
            getRes = await getLangGitHub(lang_github[i]) 
        }       
        getRes.count = convertNumberString(getRes.count.split(' ')[0]);
        result.push({
            'count': getRes.count,
            'lang': getRes.lang,
            'data': currData()
        })
        //console.log(result)
    }
    return result 
}

//pars()

export default pars