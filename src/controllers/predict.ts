// import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import fs from 'fs';

import postgre from '../database';


export default class{
    constructor() {
        
    }

    async getHHAllPredict(): Promise<{}> {
        try {
            const { rows }: QueryResult = 
                await postgre.query("select * from hhpredict");            

            return { rows }
        } catch (error: any) { return { error } }
    }

    async getGitAllPredict(): Promise<{}> {
        try {
            const { rows }: QueryResult = 
                await postgre.query("select * from gitpredict");            

            return { rows }
        } catch (error: any) { return { error } }
    }

    async getGitLangPredict(lang: string): Promise<{}> {
        try {
            const { rows } = await postgre.query(`select * from gitpredict where lang = $1`, [lang])
            if (rows[0]) { return { rows } }
            return { msg: "not found" }
        } catch (error) {
            return { error }
        }
    }

    async getHHLangPredict(lang: string): Promise<{}> {
        try {
            const { rows } = await postgre.query(`select * from hhpredict where lang = $1`, [lang])
            if (rows[0]) { return { rows } }
            return { msg: "not found" }
        } catch (error) {
            return { error }
        }
    }

    async getHHRegionPredict(region: string): Promise<{}> {
        try {
            const { rows } = await postgre.query(`select * from hhpredict where region = $1`, [region])
            if (rows[0]) { return { rows } }
            return { msg: "not found" }
        } catch (error) {
            return { error }
        }
    }

    async getHHLangRegionPredict(lang: string, region: string): Promise<{}> {
        try {
            const { rows } = await postgre.query(`
                select * from hhpredict
                    where lang = $1 and
                    region = $2`,
                [lang, region]
            )
            if (rows[0]) { return { rows } }
            return { msg: "not found" }
        } catch (error) {
            return { error }
        }
    }

}



// export default testController;