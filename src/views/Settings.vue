<template>
	<div class="max-w-4xl mx-auto w-full">
		<h1 class="text-5xl font-light text-gray-400 mb-6">Settings</h1>
		<div class="space-y-14">
			<v-projects-list></v-projects-list>

			<v-categories-list></v-categories-list>
		</div>
	</div>
</template>

<script lang="ts">
import ProjectsListVue from '@/components/ProjectsList.vue';
import CategoriesListVue from '@/components/CategoriesList.vue';

export default {
	components: {
		'v-projects-list': ProjectsListVue,
		'v-categories-list': CategoriesListVue,
	}
};
</script>
