import { Constants } from "./constants";

export class Utils {
    public static getSkipLimit = (page: number, recordsPerPage: number = 0) => {
        page = +page;
        let skip = 0;
        const limit = recordsPerPage ? recordsPerPage : Constants.RECORDS_PER_PAGE; // for paginate records
        if (page) {
            skip = (page - 1) * limit;
        }
        return { limit, skip };
    }
    public static removeApostropheFromLikeQuery = (value: string) => {
        return `LIKE '%${value.replace(/'/g, "\\'")}%'`;
    }
}