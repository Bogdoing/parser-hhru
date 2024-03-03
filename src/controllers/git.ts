import { QueryResult } from 'pg';
import fs from 'fs';

import postgre from '../database';


const GitController = {
    getAll: async(): Promise<{}>  => {
        try {
            const { rows } = await postgre.query("select * from git", [])

            if (rows[0]) { return { rows } }

            return { msg: "not found" }

        } catch (error) {
            return { error }
        }
    },
    getData: async(data: string): Promise<{}>  => {
        try {
            const { rows } = await postgre.query(`
                select * from git where data = $1`, 
                [data]
            )

            if (rows[0]) { return { rows } }

            return { msg: "not found" }

        } catch (error) {
            return { error }
        }
    },
    getLang: async(lang: string): Promise<{}>  => {
        try {
            const { rows } = await postgre.query(`
                select * from git 
                where lang = $1
                order by data`, 
                [lang]
            )

            if (rows[0]) { return { rows } }

            return { msg: "not found" }

        } catch (error) {
            return { error }
        }
    },
    getDataLang: async(data: string, lang: string): Promise<{}>  => {
        try {
            const { rows } = await postgre.query(`
                select * from git 
                where data = $1 and lang = $2`, 
                [data, lang]
            )

            if (rows[0]) { return { rows } }

            return { msg: "not found" }

        } catch (error) {
            return { error }
        }
    },
};


export default GitController;