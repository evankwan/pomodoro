import { formatTime } from "~/utilities/timeUtilities";

const ONE_SECOND_IN_MS = 1000;
const DEFAULT_TIMER_LENGTH_IN_MS = ONE_SECOND_IN_MS * 60 * 25; // 1000ms * 60s * 25min
const DEFAULT_BREAK_LENGTH_IN_MS = ONE_SECOND_IN_MS * 60 * 5; // 1000ms * 60s * 5min

export const useTimer = () => {
	const timer = ref<number>();
	const remainingTime = ref<number>(DEFAULT_TIMER_LENGTH_IN_MS);
	const isPaused = ref<Boolean>(false);
	const hasTimerRun = ref<Boolean>(false);

	const isTimerRunning = computed<Boolean>(() => {
		return Boolean(timer.value) ?? false;
	});

	const isTimerFinished = computed<Boolean>(() => {
		return remainingTime.value === 0;
	});

	const formattedRemainingTime = computed<string>(() => {
		return formatTime(remainingTime.value);
	});

	const start = (): void => {
		// short circuit to prevent double intervals
		if (Boolean(timer.value)) {
			return;
		}
		if (remainingTime.value === 0) {
			remainingTime.value = DEFAULT_TIMER_LENGTH_IN_MS;
		}
		isPaused.value = false;
		hasTimerRun.value = true;
		timer.value = setInterval(() => {
			remainingTime.value -= ONE_SECOND_IN_MS;
			if (remainingTime.value === 0) {
				isInBreak.value = true;
				stop();
			}
		}, ONE_SECOND_IN_MS);
	};

	const stop = (): void => {
		clearInterval(timer.value);
		timer.value = undefined;
		isPaused.value = false;
	};

	const pause = (): void => {
		clearInterval(timer.value);
		timer.value = undefined;
		isPaused.value = true;
	};

	const reset = (): void => {
		clearInterval(timer.value);
		timer.value = undefined;
		remainingTime.value = DEFAULT_TIMER_LENGTH_IN_MS;
	};

	const isInBreak = ref<Boolean>(false);

	const startBreak = (): void => {
		// short circuit to prevent double intervals
		if (Boolean(timer.value)) {
			return;
		}

		if (remainingTime.value === 0) {
			remainingTime.value = DEFAULT_BREAK_LENGTH_IN_MS;
		}
		isPaused.value = false;
		timer.value = setInterval(() => {
			remainingTime.value -= ONE_SECOND_IN_MS;
			if (remainingTime.value === 0) {
				isInBreak.value = false;
				stopBreak();
			}
		}, ONE_SECOND_IN_MS);
	};

	const stopBreak = (): void => {
		clearInterval(timer.value);
		timer.value = undefined;
		isPaused.value = false;
		isInBreak.value = false;
	};

	return {
		hasTimerRun,
		isTimerRunning,
		isTimerFinished,
		formattedRemainingTime,
		start,
		pause,
		reset,
		startBreak,
		stopBreak,
		isInBreak,
	};
};
