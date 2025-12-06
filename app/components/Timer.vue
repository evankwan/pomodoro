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
} = useTimer();

const statusText = computed(() => {
	if (!hasTimerRun.value) {
		return "Ready";
	}
	if (isTimerFinished.value) {
		return "Finished";
	}
	return isTimerRunning.value ? "Focus time" : "Paused";
});
</script>

<template>
	<h2>{{ formattedRemainingTime }}</h2>
	<h3>Status: {{ statusText }}</h3>
	<button @click="start">Start</button>
	<button v-if="isTimerRunning" @click="pause">Pause</button>
	<button v-if="!isTimerRunning" @click="reset">Reset</button>
</template>
