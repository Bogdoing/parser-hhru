import { QueryResult } from 'pg';
import fs from 'fs';

import postgre from '../database';
import parsGit from '../controllers/parser/parserGit';
import parsHH from '../controllers/parser/perserHH';

import parsList from '../controllers/parser/parsList'

const parserController = {
    getParserGit: async(): Promise<{}>  => {
        try {
            let resGit: { count: string, lang: string, data: any }[] 
                = await parsGit(parsList.lang_github)    

            // await postDB(resGit)
            resGit.forEach(async element => {
                await postDBGit(element.count, element.lang, element.data)
            });

            return  { msg: resGit }            
        } catch (error) {
            return { msg: 'getParserGit - eror' }
        }
    },
    getParserHH: async(): Promise<{}>  => {
        try {    
            let result = [];
            for (let i = 0; i < parsList.region_hh.length; i++) {
                let resHH: { lang: string; vac: string; vacRef: string; res: string; region: any; data: string }[] 
                    = await parsHH(parsList.region_hh[i])
                
                resHH.forEach(element => {
                    postDBHH(element.lang, element.vac, element.vacRef, element.res, element.region, element.data)
                });
                
                result.push(resHH)
            }        
            return { msg: result }            
        } catch (error) {
            return { msg: 'getParserGit - eror' }
        }
    }  
};

async function postDBGit(count: string, lang: string, data: any): Promise<{}> {
    try {
        console.log('postDBGit')
        const { rows }: QueryResult = 
            await postgre.query(`
                INSERT INTO git (count, lang, data) 
                VALUES (
                    $1, $2, $3
                );`, [count, lang, data]);   

        return { rows }
    } catch (error: any) { return { error } }
}

async function postDBHH(lang: string, vac: string, vacRef: string, res: string, region: any, data: string): Promise<{}> {
    try {
        console.log('postDBHH')
        const { rows }: QueryResult = 
            await postgre.query(`
            INSERT INTO hh (lang, vac, vacRef, res, region, data) 
            VALUES 
            (
                $1, $2, $3, $4, $5, $6
            );`, [lang, vac, vacRef, res, region, data]);   

        return { rows }
    } catch (error: any) { return { error } }
}

export default parserController;