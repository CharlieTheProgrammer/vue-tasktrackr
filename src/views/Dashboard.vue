<template>
	<div class="max-w-4xl mx-auto w-full">
		<v-projects-list></v-projects-list>
	</div>
</template>

<script lang="ts">
import ProjectsListVue from '@/components/ProjectsList.vue';
import { ProjectsService } from '@/services/projects.service';
import { CategoriesService } from '@/services/categories.service';

export default {
	components: {
		'v-projects-list': ProjectsListVue,
	},

	async beforeRouteEnter(to, from, next) {
		let categoriesService = new CategoriesService();
		let projectsService = new ProjectsService();
		const [categories, projects] = await Promise.all([categoriesService.findAll(), projectsService.findAll()]);

		if (categories.length === 0 || projects.length === 0) {
			// @ts-ignore
			next({ name: 'Settings', query: { 'isNewUser' : false } });
		} else {
			next();
		}
	},
};
</script>
