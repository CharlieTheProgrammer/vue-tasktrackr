<template>
	<div class="mx-auto w-full">
		<header class="mb-4 flex justify-between items-center">
			<h1 class="text-4xl mb-2">Entries</h1>
			<button class="rounded px-2 py-2 bg-indigo-200" @click="addEntry">New Entry</button>
		</header>
		<div class="" v-if="!loading && entries.length === 0">You have no entries. Please add a new entry.</div>
		<div class="flex flex-col" v-else>
			<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
						<table class="min-w-full divide-y divide-gray-200">
							<thead class="bg-gray-50">
								<tr>
									<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
									<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
									<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
									<th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
									<!-- <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th> -->
									<th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total Time</th>
									<th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
								</tr>
							</thead>
							<tbody class="bg-white divide-y divide-gray-200">
								<tr class="animate-pulse" v-if="loading">
									<td class="pl-6 py-4 whitespace-nowrap rounded-md">
										<div class="bg-gray-200 h-8 w-full"></div>
									</td>
									<td class="py-4 whitespace-nowrap rounded-md">
										<div class="bg-gray-200 h-8 w-full"></div>
									</td>
									<td class="py-4 whitespace-nowrap rounded-md">
										<div class="bg-gray-200 h-8 w-full"></div>
									</td>
									<td class="py-4 whitespace-nowrap rounded-md">
										<div class="bg-gray-200 h-8 w-full"></div>
									</td>
									<td class="pr-6 py-4 whitespace-nowrap rounded-md">
										<div class="bg-gray-200 h-8 w-full"></div>
									</td>
								</tr>
								<tr v-for="entry in entries" :key="entry.id" ref="entryRows" v-else>
									<td class="py-4">
										<select class="m-2.5 rounded-md border border-indigo-100 w-full">
											<!-- <option v-for="(category, index) in project.categories" :key="index" :selected="entry.categoryId == category.id ? 'selected' : null" :value="category.id">
														{{ category.name }}
													</option> -->
										</select>
									</td>
									<td class="text-center text-gray-400">
										{{ entry.startTime | toDateFormat }}
									</td>
									<td>
										<textarea class="w-full m-2.5 rounded-md border border-indigo-100" :value="entry.description"> </textarea>
									</td>
									<td class="text-center text-gray-400">
										{{ entry.startTime | toTimeFormat }}
									</td>
									<!-- <td v-if="displayEndTime" class="text-center d-none d-sm-table-cell">{{ entry.total_time | toTimeFormat }}</td> -->
									<td class="text-center text-gray-500">
										{{ entry.startTime | generateTotalTime(entry.endTime) }}
									</td>
									<td class="w-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="mx-auto h-5 w-5 text-gray-300 hover:text-red-600 cursor-pointer"
											viewBox="0 0 20 20"
											fill="currentColor"
											@click="deleteEntry(entry)"
										>
											<path
												fill-rule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
												clip-rule="evenodd"
											/>
										</svg>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { DateTime } from 'luxon';
import { CreateEntryDto } from '@/dtos/create-entry.dto';
import { UpdateEntryDto } from '@/dtos/update-entry.dto';
import { ProjectsService } from '@/services/projects.service';
import { EntriesService } from '@/services/entries.service';
import { AuthService } from '@/services/auth.service';

export default {
	data() {
		return {
			projectsService: new ProjectsService(),
			entriesService: new EntriesService(),
			authService: new AuthService(),
			loading: true,
			// project: {
			// 	id: 1,
			// 	name: 'Project 1',
			// 	hidden: false,
			// 	categories: [
			// 		{
			// 			id: 1,
			// 			userId: 1,
			// 			name: 'Testing',
			// 			hidden: false,
			// 		},
			// 		{
			// 			id: 2,
			// 			userId: 1,
			// 			name: 'Planning',
			// 			hidden: false,
			// 		},
			// 		{
			// 			id: 3,
			// 			userId: 1,
			// 			name: 'Deploying',
			// 			hidden: false,
			// 		},
			// 	],
			// 	entries: [
			// 		{
			// 			id: 1,
			// 			projectId: 1,
			// 			categoryId: 1,
			// 			userId: 1,
			// 			description: 'Some text',
			// 			startTime: '2021-05-26T21:37:20.430Z',
			// 			endTime: '2021-05-26T21:56:20.430Z',
			// 		},
			// 		{
			// 			id: 2,
			// 			projectId: 1,
			// 			categoryId: 1,
			// 			userId: 1,
			// 			description: 'lorem',
			// 			startTime: '2021-05-26T21:37:20.430Z',
			// 			endTime: '2021-05-26T21:56:20.430Z',
			// 		},
			// 		{
			// 			id: 3,
			// 			projectId: 1,
			// 			categoryId: 1,
			// 			userId: 1,
			// 			description: 'I am the third entry',
			// 			startTime: '2021-05-26T21:37:20.430Z',
			// 			endTime: '2021-05-26T21:56:20.430Z',
			// 		},
			// 	],
			// },

			projects: [],
			entries: [
				{
					id: 1,
					projectId: 1,
					categoryId: 1,
					userId: 1,
					description: 'Some text',
					startTime: '2021-05-26T21:37:20.430Z',
					endTime: '2021-05-26T21:56:20.430Z',
					createdAt: '2021-05-26T21:37:20.430Z',
				},
				{
					id: 2,
					projectId: 1,
					categoryId: 1,
					userId: 1,
					description: 'lorem',
					startTime: '2021-05-26T21:37:20.430Z',
					endTime: '2021-05-26T21:56:20.430Z',
					createdAt: '2021-05-26T21:38:20.430Z',
				},
				{
					id: 3,
					projectId: 1,
					categoryId: 1,
					userId: 1,
					description: 'I am the third entry',
					startTime: '2021-05-26T21:37:20.430Z',
					endTime: '2021-05-26T21:56:20.430Z',
					createdAt: '2021-05-26T21:40:20.430Z',
				},
			],
		};
	},
	computed: {
		project() {
			const { id } = this.$route.params;
			if (this.projects.length > 0) return this.projects.find((project) => project.id == id);
			return {};
		},
		// sortedEntries() {
		// 	return this.entries.sort((a,b) => {
		// 		const createdA = DateTime.fromISO(a.createdAt)
		// 		const createdB = DateTime.fromISO(b.createdAt)
		// 		if (createdA > createdB) return -1;
		// 		if (createdA < createdB) return 1;
		// 		return 0;
		// 	})
		// }
	},
	filters: {
		generateTotalTime(startTime, endTime) {
			if (!endTime) return '0s';
			const sTime = DateTime.fromISO(startTime);
			const eTime = DateTime.fromISO(endTime);
			const diffTime = eTime.diff(sTime, 'minutes');
			return `${diffTime.minutes}m${diffTime.seconds}s`;
		},
		toTimeFormat(time) {
			return DateTime.fromISO(time).toLocaleString(DateTime.TIME_SIMPLE);
		},
		toDateFormat(time) {
			return DateTime.fromISO(time).toLocaleString(DateTime.DATE_MED);
		},
	},
	async created() {
		// await this.getEntries();
		await this.getProjects();
		this.loading = false;
	},
	methods: {
		focusInput(node) {
			node.querySelector('textarea').focus();
		},

		filterArray(arr, id) {
			return arr.filter((item) => item.id !== id);
		},

		async getEntries() {
			this.entries = await this.entriesService.findAll();
			return;
		},

		async getProjects() {
			this.projects = await this.projectsService.findAll();
			return;
		},

		async addEntry() {
			// @ts-ignore
			let entry = new CreateEntryDto({
				projectId: this.project.id,
			});

			this.entries.push(entry);

			this.$nextTick(() => {
				const lastIndex = this.$refs.entryRows.length - 1;
				const ref = this.$refs.entryRows[lastIndex];
				this.focusInput(ref);
			});

			this.saveEntry(entry);
		},

		async deleteEntry(entry: CreateEntryDto) {
			const truncatedDesc = entry.description.substring(0, 20);
			const result = window.confirm(`Are you sure you want to delete "${truncatedDesc}..."`);
			if (result && entry.id) {
				let res = await this.entriesService.delete(entry.id);
				this.entries = this.filterArray(this.entries, entry.id);
			} else if (result) this.entries = this.filterArray(this.entries, entry.id);
		},

		async saveEntry(entry: CreateEntryDto) {
			let user = this.authService.getUser();
			entry.userId = user.id;

			if (entry.id) await this.entriesService.update(entry);
			else {
				await this.entriesService.create(entry);
				await this.getEntries();
			}
			return;
		},
	},
};
</script>

<style></style>
