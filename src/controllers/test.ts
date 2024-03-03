// import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import fs from 'fs';

import postgre from '../database';

const testController = {
    getAll: async(): Promise<{}> => {
        try {
            const { rows }: QueryResult = 
                await postgre.query("select * from hh");            

            return { rows }
        } catch (error: any) { return { error } }
    },
    getById: async(id: string): Promise<{}> => {
        try {
            const { rows } = await postgre.query("select * from hh where id = $1", [id])

            if (rows[0]) { return { rows } }

            return { msg: "not found" }

        } catch (error) {
            return { error }
        }
    },
    getByLang: async(lang: string): Promise<{}> => {
        try {
            const { rows } = await postgre.query("select * from hh where lang = $1", [lang])

            if (rows[0]) { return { rows } }

            return { msg: "not found" }
        } catch (error) {
            return { error }
        }
    },
    getByDate: async(date: string): Promise<{}> => {
        try {
            const { rows } = await postgre.query("select * from hh where data = $1", [date])

            if (rows[0]) { return { rows } }

            return { msg: "not found" }

        } catch (error) {
            return { error }
        }
    },
    postAllHH: async(): Promise<{}>  => {
        const folderPath = 'D:/FILES/html/bogdoing-site-hh/dataHH/'
        try {
            console.log('postAllHH')
            let filenames = await loadDataNameJson(folderPath)
            filenames.forEach(element => {
                loadData(folderPath + '' + element)                
            });

            return  { msg: "OK" }            
        } catch (error) {
            return { msg: 'eror' }
        }
    },
    postAllGit: async(): Promise<{}>  => {
        const folderPath = 'D:/FILES/html/bogdoing-site-hh/dataGit/'
        try {
            console.log('postAllGit')
            let filenames = await loadDataNameJson(folderPath)
            filenames.forEach(element => {
                insertDataGit(folderPath + '' + element)
            });

            return  { msg: "OK" }            
        } catch (error) {
            return { msg: 'eror' }
        }
    }
};

async function insertDataHH(data: any[]) {
    
    const client = await postgre.connect();
    try {
        for (const item of data) {
            const query = 'INSERT INTO hh (lang, vac, vacRef, res, region, data) VALUES ($1, $2, $3, $4, $5, $6)';
            const values = [item.lang, item.vac, item.vacRef, item.res, item.region, item.data];
            await client.query(query, values);
        }
        console.log('Data inserted successfully!');
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        client.release();
    }
}

async function insertDataGit(url: string) {
    const jsonString = fs.readFileSync(url, 'utf-8');
    const data = JSON.parse(jsonString);
    
    const client = await postgre.connect();
    try {
        for (const item of data) {
            const query = `INSERT INTO git (count, lang, data) VALUES ($1, $2, $3);`;
            const values = [item.count, item.lang, item.data];
            await client.query(query, values);
        }
        console.log('Data inserted successfully!');
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        client.release();
    }
}
  
async function loadData(url: string) {
    try {
        const jsonString = fs.readFileSync(url, 'utf-8');
        const data = JSON.parse(jsonString);
        await insertDataHH(data);
    } catch (error) {
        console.error('Error loading data:', error);
    }
}  


async function loadDataNameJson(folderPath: string){
    // const folderPath = 'D:/FILES/html/bogdoing-site-hh/dataHH/'
    //const folderPath = 'D:/FILES/html/bogdoing-site-hh/dataGit/'
    
    try {
        const filenames = fs.readdirSync(folderPath);
        return filenames;
    } catch (error) {
        console.error('Error occurred while reading folder:', error);
        return [];
    }
    
}

export default testController;