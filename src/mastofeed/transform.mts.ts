import { Transform } from "mastofeed/dist/utils/transforms.mjs";

export class TrimTransform extends Transform {
    apply = (value: string) => {
        return value.trim();
    };
}

const MONTH_NAMES: Record<string, string> = {
    Jan: "January",
    Feb: "February",
    Mar: "March",
    Apr: "April",
    May: "May",
    Jun: "June",
    Jul: "July",
    Aug: "August",
    Sep: "September",
    Oct: "October",
    Nov: "November",
    Dec: "December",
};

/**
 * Formats an RFC 822 RSS date, eg. "Fri, 24 Jul 2026 19:29:00 -0400", as "July 24, 2026".
 *
 * The date is read as written in the feed, so the day never shifts due to a time zone conversion.
 */
export class DateTransform extends Transform {
    apply = (value: string) => {
        const match = value.match(/(\d{1,2}) ([A-Z][a-z]{2}) (\d{4})/);
        if (!match) {
            throw new Error(`Failed to parse RSS date '${value}'.`);
        }
        const [, day, monthAbbreviation, year] = match;
        const month = MONTH_NAMES[monthAbbreviation];
        if (!month) {
            throw new Error(`Unknown month '${monthAbbreviation}' in RSS date '${value}'.`);
        }
        return `${month} ${parseInt(day, 10)}, ${year}`;
    };
}
