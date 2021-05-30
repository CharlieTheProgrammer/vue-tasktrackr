<template>
	<section>
		<header class="mb-4 flex justify-between items-center">
			<h1 class="text-4xl mb-2">Projects</h1>
			<!-- <div class="text-sm text-gray-400">Select a project below</div> -->
			<button class="text-xs rounded px-2 py-2 bg-indigo-200" @click="addProject">Add New Project</button>
		</header>
		<div class="flex flex-col">
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
								<tr class="hover:bg-gray-100 cursor-pointer" v-for="project in projects" :key="project.id" ref="projectRows">
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
										<button type="button" class="text-gray-400 hover:text-red-600 focus:outline-none" @click="project.editable = !project.editable" v-if="!project.editable">
											Delete
										</button>
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
import { ProjectsService } from "@/services/projects.service";

export default {
	// props: {
	// 	projects: {
	// 		type: Array,
	// 		default: () => [],
	// 	},
	// },
	data() {
		return {
			projectsService: new ProjectsService(),
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
					editable: false,
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
	created() {
		// Api call to get the projects
		this.projectsService.findAll().then(data => console.log(data));

		console.log(process.env.VUE_APP_API_URL);
	},
	methods: {
		focusInput(node) {
			node.querySelector('input').focus();
		},

		hasEmptyName(items): number {
			return items.findIndex((item) => item.name === '');
		},

		handleEmptyName() {
			this.$nextTick(() => {
				const ref = this.$refs.projectRows[this.hasEmptyName(this.projects)];
				this.focusInput(ref);
			});
		},

		addProject() {
			if (this.hasEmptyName(this.projects) > -1) return this.handleEmptyName();

			let project = new CreateProjectDto();
			project.editable = true;
			this.projects.push(project);

			this.$nextTick(() => {
				const lastIndex = this.$refs.projectRows.length - 1;
				const ref = this.$refs.projectRows[lastIndex];
				this.focusInput(ref);
			});
		},

		async saveProject(project, index) {
			// How do we find the row that matches the projects without assuming it has an id?
			if (this.hasEmptyName(this.projects) > -1) return this.handleEmptyName();
			project.editable = !project.editable;

			// api call to save project
			console.log(project);
		},
	},
};
</script>

<style></style>
