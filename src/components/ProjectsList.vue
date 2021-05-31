<template>
	<section>
		<header class="mb-4 flex justify-between items-center">
			<h1 class="text-4xl mb-2">Projects</h1>
			<!-- <div class="text-sm text-gray-400">Select a project below</div> -->
			<button class="text-xs rounded px-2 py-2 bg-indigo-200" @click="addProject">Add New Project</button>
		</header>
		<div class="" v-if="!loading && projects.length === 0">You have no projects. Please add a new project.</div>
		<div class="flex flex-col" v-else>
			<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
						<table class="min-w-full divide-y divide-gray-200">
							<thead class="bg-gray-50">
								<tr>
									<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
									<th scope="col" class="relative px-6 py-3">
										<span class="sr-only">Edit</span>
									</th>
								</tr>
							</thead>
							<tbody class="bg-white divide-y divide-gray-200">
								<tr class="animate-pulse" v-if="loading">
									<td class="pl-6 py-4 whitespace-nowrap rounded-md">
										<div class="bg-gray-200 h-8 w-full"></div>
									</td>
									<td class="pr-6 py-4 whitespace-nowrap rounded-md">
										<div class="bg-gray-200 h-8 w-full"></div>
									</td>
								</tr>
								<tr class="hover:bg-gray-100 cursor-pointer" v-for="project in projects" :key="project.id" ref="projectRows" v-else @click="goTo(project)">
									<td class="px-6 py-4 whitespace-nowrap">
										<label class="block" v-if="project.editable">
											<input
												type="email"
												class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
												v-model="project.name"
												v-on:keyup.enter="saveProject(project)"
											/>
										</label>
										<div v-else>
											{{ project.name }}
										</div>
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
										<button type="button" class="text-indigo-600 hover:text-indigo-900 focus:outline-none" @click="project.editable = !project.editable" v-if="!project.editable">
											Edit
										</button>
										<button
											type="button"
											class="text-green-600 hover:text-green-900 focus:outline-none disabled:opacity-50"
											@click="saveProject(project)"
											:disabled="!project.name"
											v-else
										>
											Save
										</button>
										<button type="button" class="text-gray-400 hover:text-red-600 focus:outline-none" @click="deleteProject(project)">Delete</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { CreateProjectDto } from '@/dtos/create-project.dto';
import { ProjectsService } from '@/services/projects.service';
import { AuthService } from '@/services/auth.service';

export default {
	data() {
		return {
			projectsService: new ProjectsService(),
			authService: new AuthService(),
			loading: true,
			projects: [
				// {
				// 	id: 1,
				// 	name: 'Project 1',
				// 	hidden: false,
				// 	editable: false,
				// },
				// {
				// 	id: 2,
				// 	name: 'Project 2',
				// 	hidden: false,
				// 	editable: false,
				// },
				// {
				// 	id: 3,
				// 	name: 'Project 3',
				// 	hidden: false,
				// },
				// {
				// 	id: 4,
				// 	name: 'Project 4',
				// 	hidden: false,
				// },
			],
		};
	},
	// Note: I can use async here, but be careful because Vue will treat this as sync
	// meaning it will not wait for this code to finish before other steps, like rendering, etc
	// This is where a loading state becomes useful.
	async created() {
		await this.getProjects();
		this.loading = false;
	},
	methods: {
		goTo(project) {
			const { id } = project;
			this.$router.push({ path: `/projects/${id}` });
		},

		focusInput(node) {
			node.querySelector('input').focus();
		},

		hasEmptyName(items): number {
			return items.findIndex((item) => item.name === '');
		},

		filterArray(arr, id) {
			return arr.filter((item) => item.id !== id);
		},

		handleEmptyName() {
			this.$nextTick(() => {
				const ref = this.$refs.projectRows[this.hasEmptyName(this.projects)];
				this.focusInput(ref);
			});
		},

		async getProjects() {
			let projects = await this.projectsService.findAll();
			projects = projects.map((project) => {
				project.editable = false;
				return project;
			});
			this.projects = projects;
			return;
		},

		addProject() {
			if (this.hasEmptyName(this.projects) > -1) return this.handleEmptyName();

			let project = new CreateProjectDto();
			// @ts-ignore
			project.editable = true;
			this.projects.push(project);

			this.$nextTick(() => {
				const lastIndex = this.$refs.projectRows.length - 1;
				const ref = this.$refs.projectRows[lastIndex];
				this.focusInput(ref);
			});
		},

		async deleteProject(project) {
			const result = window.confirm(`Are you sure you want to delete ${project.name}`);
			if (result && project.id) {
				await this.projectsService.delete(project.id);
				this.projects = this.filterArray(this.projects, project.id);
			} else if (result) this.projects = this.filterArray(this.projects, project.id);
		},

		async saveProject(project: CreateProjectDto, index) {
			if (this.hasEmptyName(this.projects) > -1) return this.handleEmptyName();
			let user = this.authService.getUser();
			project.userId = user.id;
			// @ts-ignore
			project.editable = !project.editable;

			if (project.id) await this.projectsService.update(project);
			else {
				await this.projectsService.create(project);
				await this.getProjects();
			}
			return;
		},
	},
};
</script>

<style></style>
