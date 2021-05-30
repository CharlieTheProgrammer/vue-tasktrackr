<template>
	<div class="max-w-4xl mx-auto w-full">
		<div class="space-y-14">
			
			<v-projects-list ref="projects" :projects="projects" @addProject="addProject" @saveProject="saveProject"></v-projects-list>

		</div>
	</div>
</template>

<script lang="ts">
import ProjectsListVue from '@/components/ProjectsList.vue';

export default {
	components: {
		'v-projects-list': ProjectsListVue,
	}
};
</script>
