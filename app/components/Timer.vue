<script setup lang="ts">
import { useTimer } from "~/composables/useTimer";

const {
	hasTimerRun,
	isTimerRunning,
	isTimerFinished,
	formattedRemainingTime,
	start,
	pause,
	reset,
	startBreak,
	isInBreak,
} = useTimer();

const statusText = computed(() => {
	if (!hasTimerRun.value) {
		return "Ready";
	}
	if (isTimerFinished.value && isInBreak.value) {
		return "Start break time";
	}
	if (isInBreak.value) {
		return "Break time";
	}
	if (isTimerFinished.value && !isInBreak.value) {
		return "Start focus time";
	}
	return isTimerRunning.value ? "Focus time" : "Paused";
});
</script>

<template>
	<h2>{{ formattedRemainingTime }}</h2>
	<h3>Status: {{ statusText }}</h3>
	<button v-if="!isTimerRunning && !isInBreak" @click="start">Start</button>
	<button v-if="!isTimerRunning && isInBreak" @click="startBreak">
		Start break
	</button>
	<button v-if="isTimerRunning" @click="pause">Pause</button>
	<button v-if="!isTimerRunning" @click="reset">Reset</button>
</template>
