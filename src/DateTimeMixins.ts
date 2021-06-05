import DateHelpers from '@/helpers/dateHelpers';

const DateTimeMixins = {
	filters: {
		toTimeFormat(time: string) {
			return DateHelpers.toTimeFormat(time);
		},
		toDateFormat(time: string) {
			return DateHelpers.toDateFormat(time);
		},
		toHrsSecondsFormat(time: number) {
			return DateHelpers.toHrsSecondsFormat(time);
		},
	},
};


export {
	DateTimeMixins,
};
