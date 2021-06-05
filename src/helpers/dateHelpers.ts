import { DateTime } from 'luxon';
import Duration from 'luxon/src/duration.js';

export default class DateHelpers {
	static toTimeFormat(time: string) {
		return DateTime.fromISO(time).toLocaleString(DateTime.TIME_SIMPLE);
	}

	static toDateFormat(time: string) {
		return DateTime.fromISO(time).toLocaleString(DateTime.DATE_MED);
	}

	static toHrsSecondsFormat(time: number) {
		// @ts-ignore
		return Duration.fromObject({ seconds: time }).toFormat('mm:ss');
	}
}
