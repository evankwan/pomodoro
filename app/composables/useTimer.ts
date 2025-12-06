import { formatTime } from "~/utilities/timeUtilities";

const ONE_SECOND_IN_MS = 1000;
const DEFAULT_TIMER_LENGTH_IN_MS = 1000 * 15; // 1000 milliseconds per second, * 60 seconds * 25 minutes

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
		isPaused.value = false;
		hasTimerRun.value = true;
		timer.value = setInterval(() => {
			remainingTime.value -= ONE_SECOND_IN_MS;
			if (remainingTime.value === 0) {
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

	return {
		hasTimerRun,
		isTimerRunning,
		isTimerFinished,
		formattedRemainingTime,
		start,
		pause,
		reset,
	};
};
