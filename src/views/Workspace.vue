<template>
	<div class="w-full max-w-6xl mx-auto">
		<section>
			<!-- Project nav -->
			<div class="bg-gray-100 hidden">
				<div class="flex justify-between items-center p-4 mx-xl-5">
					<!-- <p class="text-4xl font-weight-normal">{{ project ?"": project.name  }}</p> -->
					<button class="rounded px-4 py-4 bg-indigo-200">Change Project</button>
				</div>
			</div>
			<!-- <hr /> -->
			<!-- Popup Modal Window For Nav-->
			<div></div>

			<v-entries-list></v-entries-list>
		</section>
	</div>
</template>

<script lang="ts">
import EntriesListVue from '@/components/EntriesList.vue';

export default {
	components: {
		'v-entries-list': EntriesListVue,
	},
	beforeRouteLeave(to, from, next) {
		if (this.$route.meta.currentRunningEntry) {
			const answer = window.confirm('Do you really want to leave? You have unsaved changes!');
			if (answer) {
				next();
			} else {
				next(false);
			}
		} else {
			next();
		}
	},
};
</script>
