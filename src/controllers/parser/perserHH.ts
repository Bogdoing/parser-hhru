import { JSDOM } from 'jsdom';
import axios from 'axios';

import dataPars from '../parser/parsList'

const url_hh = dataPars.url_hh
const region_hh = dataPars.region_hh

/**
 * Fetches job count from the specified URL and region.
 * @param {string} url - The URL to search for job vacancies.
 * @param {string} region - The region to search for job vacancies.
 * @returns {Promise<{ count: string, lang: string, region: string }>} The job count, language, and region.
 */
const getCountJob = async(url: string, region: string): Promise<{ count: string, lang: string, region: string } | null> => {
    try{
        const response = await axios.get(`https://voronezh.hh.ru/search/vacancy?ored_clusters=true&search_field=name&search_field=company_name&hhtmFrom=vacancy_search_list&area=${region}&text=${url}&enable_snippets=false&L_save_area=true`,
        {
            headers: { 'Accept': 'text/html' }
        })
        
        const dom = new JSDOM(response.data); // Инициализация библиотеки jsdom для разбора полученных HTML-данных, как в браузере      
        
        var linksLength = await dom.window.document.getElementsByClassName('bloko-header-section-3')[0].textContent
        if (!linksLength) {
            return null 
        }

        let linksLengthCount = linksLength.split(' ')
        if (linksLengthCount[0] == 'По') linksLengthCount[0] = '0'

        const linksLengthLang = linksLength.split('«')
        
        //console.log(linksLength)
        
        return {
            'count' :  linksLengthCount[0],
            'lang'  :  linksLengthLang[1].split('»')[0],
            'region':  region
        } 
    }
    catch(e) { 
        console.log('Eror - ' + e)
        return null
    }
}



const getJobReference = async(url: any, region: any) => {
    try{
        const response = await axios.get(`https://voronezh.hh.ru/search/vacancy?text=${url}&area=${region}&hhtmFrom=main&hhtmFromLabel=vacancy_search_line`,
        {
            headers: { 'Accept': 'text/html' }
        })
        const dom = new JSDOM(response.data); // Инициализация библиотеки jsdom для разбора полученных HTML-данных, как в браузере

        var linksLength = await
            dom.window.document.getElementsByClassName('bloko-header-section-3')[0].textContent
        if (linksLength == null) linksLength = ''


        let linksLengthCount = linksLength.split(' ')
        if (linksLengthCount[0] == 'По') linksLengthCount[0] = '0'

        let linksLengthLang = linksLength.split('«')
        
        //console.log(linksLength)
        
        return {
            'count' :  linksLengthCount[0],
            'lang'  :  linksLengthLang[1].split('»')[0],
            'region':  region
        } 
    }
    catch(e) { console.log('Eror - ' + e) }
}

const getCountResum = async (url: any, region: any) => {
    try {
        const response = await axios.get(`https://voronezh.hh.ru/search/resume?text=${url}&area=${region}&isDefaultArea=true&exp_period=all_time&logic=normal&pos=full_text&fromSearchLine=false`,
        {
            headers: { 'Accept': 'text/html' }
        })
        const dom = new JSDOM(response.data); // Инициализация библиотеки jsdom для разбора полученных HTML-данных, как в браузере
        var linksLength = 
            dom.window.document.getElementsByClassName('bloko-header-section-3')[0].textContent
        if (linksLength == null) linksLength = '  '
        

        let linksLengthSplit = linksLength.split(' ')
        
        //console.log(linksLengthSplit)
        
        return {
            'resum': linksLengthSplit[1].slice(),
            'soisk': linksLengthSplit[4]
        }
    }
    catch (e) { console.log(e) }
}

async function fmtItems(item: any){
    let result = ''
    if (isNaN(Number(item))){
        let itemSplit = item.split('')
        switch (itemSplit.length) {
            case 5:
                result = itemSplit[0] + itemSplit[2] + itemSplit[3] + itemSplit[4]
                break;
            case 6:
                result = itemSplit[0] + itemSplit[1] + itemSplit[3] + itemSplit[4] + itemSplit[5]
                break;
            case 7:
                result = itemSplit[0] + itemSplit[1] + itemSplit[2] + itemSplit[4] + itemSplit[5] + itemSplit[6]
                break;
            case 9:
                result = itemSplit[0] + itemSplit[2] + itemSplit[3] + itemSplit[4] + itemSplit[6] + itemSplit[7] +  + itemSplit[8]
                break;
            default:
                result = 'ERROR: Unknown switch'
          }
        //console.log('fmtItems - ' + result)
        return result
    }
    else return item
}

function sleep(ms: any){ return new Promise(resolve => setTimeout(resolve, ms)); }

function currData(){
    let date = new Date();
    let month = date.getMonth() + 1;
    return date.getFullYear() + '-' + month + '-' + date.getDate();
}

async function pars(region: any){
    let result = [];

    for (let i = 0; i < url_hh.length; i++) {
        console.log('-----------------------------------------')
        
        let job = await getCountJob(url_hh[i], region)
        let jobReference = await getJobReference(url_hh[i], region)
        let resum = await getCountResum(url_hh[i], region)

        while (!job) { // typeof job === 'undefined'
            sleep(1000)
            job = await getCountJob(url_hh[i], region)
        }    
        while (!jobReference) { // typeof jobReference === 'undefined'
            sleep(1000)
            jobReference = await getJobReference(url_hh[i], region)
        }  
        while (!resum) { // typeof resum === 'undefined'
            sleep(1000)
            resum = await getCountResum(url_hh[i], region) 
        }   

        if (job && job.count) {
            job.count = await fmtItems(job.count);
        }
        if (jobReference && jobReference.count) {
            jobReference.count = await fmtItems(jobReference.count);
        }
        if (resum && resum.resum) {
            resum.resum = await fmtItems(resum.resum);
        }
        
        console.log(job.lang + ' | '+ job.count + ' | ' + region)
        result.push({
            'lang': job.lang,
            'vac': job.count,
            'vacRef': jobReference.count,
            'res': resum.resum,
            'region' : region,
            'data' : currData(),
        })     
        
        // console.log({
        //     'lang': job.lang,
        //     'vac': job.count,
        //     'vacRef': jobReference.count,
        //     'res': resum.resum,
        //     'region' : region,
        //     'data' : currData(),
        // })
    }
    //console.log('-----------------------------------------')
    return result 
}

export default pars


