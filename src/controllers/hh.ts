import { QueryResult } from 'pg';
import fs from 'fs';

import postgre from '../database';


const HHController = {
    getAll: async(): Promise<{}>  => {
        try {
            const { rows } = await postgre.query("select * from hh", [])

            if (rows[0]) { return { rows } }

            return { msg: "not found" }

        } catch (error) {
            return { error }
        }
    },
    getData: async(data: string): Promise<{}>  => {
        try {
            const { rows } = await postgre.query(`select * from hh where data = $1`, [data])

            if (rows[0]) { return { rows } }

            return { msg: "not found" }

        } catch (error) {
            return { error }
        }
    },
    getRegion: async(region: string): Promise<{}>  => {
        try {
            const { rows } = await postgre.query(`select * from hh where region = $1`, [region])

            if (rows[0]) { return { rows } }

            return { msg: "not found" }

        } catch (error) {
            return { error }
        }
    },
    getLang: async(lang: string): Promise<{}>  => {
        try {
            const { rows } = await postgre.query(`select * from hh where lang = $1`, [lang])

            if (rows[0]) { return { rows } }

            return { msg: "not found" }

        } catch (error) {
            return { error }
        }
    },
    getLangRegion: async(lang: string, region: string): Promise<{}>  => {
        try {
            const { rows } = await postgre.query(`
                select * from hh 
                where lang = $1 and region = $2
                order by data`, 
                [lang, region]
            )

            if (rows[0]) { return { rows } }

            return { msg: "not found" }

        } catch (error) {
            return { error }
        }
    },
    getLangData: async(lang: string, data: string): Promise<{}>  => {
        try {
            const { rows } = await postgre.query(`
                select * from hh 
                where lang = $1 and data = $2`, 
                [lang, data]
            )

            if (rows[0]) { return { rows } }

            return { msg: "not found" }

        } catch (error) {
            return { error }
        }
    },
};

async function getAllData(): Promise<{}> {
    try { 
        const { rows }: QueryResult = 
            await postgre.query(`select * from hh `, []);   

        return { rows }
    } catch (error: any) { return { error } }
}

export default HHController;