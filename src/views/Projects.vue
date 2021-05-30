<template>
	<div class="max-w-4xl mx-auto w-full">
		<!-- <h1 class="text-5xl font-light text-gray-400 mb-6">Settings</h1> -->
		<div class="space-y-14">
			
			<v-projects-list ref="projects" :projects="projects" @addProject="addProject" @saveProject="saveProject"></v-projects-list>

		</div>
	</div>
</template>

<script lang="ts">
import { CreateCategoryDto } from '@/dtos/create-category.dto';
import { CreateProjectDto } from '@/dtos/create-project.dto';
import ProjectsListVue from '@/components/ProjectsList.vue';
import CategoriesListVue from '@/components/CategoriesList.vue';

export default {
	components: {
		'v-projects-list': ProjectsListVue,
	},
	data() {
		return {
			projects: [
				{
					id: 1,
					name: 'Project 1',
					hidden: false,
					editable: false,
				},
				{
					id: 2,
					name: 'Project 2',
					hidden: false,
				},
				{
					id: 3,
					name: 'Project 3',
					hidden: false,
				},
				{
					id: 4,
					name: 'Project 4',
					hidden: false,
				},
			],
		};
	},
	methods: {
		focusInput(node) {
			node.querySelector('input').focus();
		},
		// skip adding items if any row has an empty name
		skipAdd(items): boolean {
			return !!items.find(item => item.name === "");
		},
		hasEmptyName(items): number {
			return items.findIndex(item => item.name === "");
		},
		focusOnElement() {

		},
		addProject() {
			if (this.hasEmptyName(this.projects) > -1) {
				this.$nextTick(() => {
					// const lastIndex = this.$refs.projects.$refs.projectRows.length - 1;
					const ref = this.$refs.projects.$refs.projectRows[this.hasEmptyName(this.projects)]
					this.focusInput(ref);
				});
				return;
			};
			let project = new CreateProjectDto();
			project.editable = true;
			this.projects.push(project);

			this.$nextTick(() => {
				const lastIndex = this.$refs.projects.$refs.projectRows.length - 1;
				const ref = this.$refs.projects.$refs.projectRows[lastIndex]
				this.focusInput(ref);
			});
		},
		async saveProject(project) {
			//
			project.editable = !project.editable;

			// api call to save project
			console.log(project);
		},
		async saveCategory(category) {
			//
			category.editable = !category.editable;

			// api call to save category
			console.log(category);
		},
		setCurrrentProjectId: function (key) {
			console.log(key);
			this.$store.dispatch('setCurrrentProjectId', key);
			this.$router.push('home');
		},
		test(id) {
			console.log(id);
		},
	},
	computed: {
		// projects: function () {
		// 	return this.$store.getters.projects;
		// },
		currentProjectID: function () {
			return this.$store.getters.currentProjectID;
		},
	},
};
</script>
