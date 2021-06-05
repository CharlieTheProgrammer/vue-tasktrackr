import { DateTime } from 'luxon';

export class Entry {
	id?: null;

	projectId: number;

	categoryId: number;

	userId: number;

	description: string;

	totalSeconds: number;

	hasRunningTimer: boolean = false;

	currentSeconds: number = 0;

	interval: any;

	startTimer() {
		this.hasRunningTimer = true;
		// If user is restating entry, the current amount of seconds needs to be cached separately
		// and added to the new current amount of seconds.
		if (this.totalSeconds > 0) this.currentSeconds = this.totalSeconds;

		const startTime = DateTime.now();
		this.interval = setInterval(() => {
			let endTime = DateTime.now();
			const diff = endTime.diff(startTime, 'seconds'); 
			if (!this.currentSeconds) this.currentSeconds = 0;
			this.totalSeconds = diff.toObject().seconds + this.currentSeconds;
		}, 100);
	}

	stopTimer() {
		this.hasRunningTimer = false;
		this.totalSeconds = Math.round(this.totalSeconds);
		this.clearInterval();
		return this;
	}

	private clearInterval() {
		clearInterval(this.interval);
	}
}
