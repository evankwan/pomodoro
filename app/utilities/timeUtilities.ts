const ONE_MINUTE_IN_MS = 1000 * 60;
export const formatTime = (remainingTime: number = 0): string => {
	let minutes: number | string = Math.floor(remainingTime / ONE_MINUTE_IN_MS);
	let seconds: number | string = (remainingTime % ONE_MINUTE_IN_MS) / 1000;
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	if (seconds < 10) {
		seconds = `0${seconds}`;
	}
	return `${minutes}:${seconds}`;
};
