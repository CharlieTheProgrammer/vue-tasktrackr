<template>
	<div class="max-w-4xl mx-auto w-full">
		<h1 class="text-5xl font-light text-gray-400 mb-6">Settings</h1>
		<p class="mt-2 mb-10" v-if="$route.query.isNewUser">It looks like it's your first time here. Please create a project and a few categories below to get started.</p>
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
