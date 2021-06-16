<template>
	<div class="mx-auto w-full">
		<header class="mb-4 flex justify-between items-center">
			<h1 class="text-4xl mb-2">Entries</h1>
			<button class="rounded px-2 py-2 bg-indigo-50 transition duration-500 ease-in-out hover:bg-indigo-500 hover:text-white" @click.stop="addEntry">New Entry</button>
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
								<tr
									class="transition duration-500 ease-in-out"
									:class="{ 'bg-indigo-500 text-white': entry.hasRunningTimer }"
									v-for="entry in entries"
									:key="entry.id"
									ref="entryRows"
									v-else
								>
									<td class="py-4">
										<select class="m-2.5 rounded-md border border-indigo-100 w-full" :class="{ 'text-black': entry.hasRunningTimer }" v-model="entry.categoryId" @change="saveEntry(entry)">
											<option value=""></option>
											<option v-for="(category, index) in categories" :key="index" :selected="entry.categoryId == category.id ? 'selected' : null" :value="category.id">
												{{ category.name }}
											</option>
										</select>
									</td>
									<td class="text-center" :class="entry.hasRunningTimer ? 'text-gray-200' : ''">
										{{ entry.createdAt | toDateFormat }}
									</td>
									<td :class="entry.hasRunningTimer ? 'text-gray-700' : ''">
										<textarea class="w-full m-2.5 rounded-md border border-indigo-100" v-model="entry.description" @blur="saveEntry(entry)"> </textarea>
									</td>
									<td class="text-xl text-center font-semibold">
										{{ entry.totalSeconds | toHrsSecondsFormat }}
									</td>
									<td class="w-2 px-3">
										<div class="flex items-center space-x-3">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-12 w-12 cursor-pointer"
												:class="entry.hasRunningTimer ? '' : 'text-gray-400 hover:text-indigo-500'"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												v-if="entry.hasRunningTimer"
												@click.stop="timerStop(entry)"
											>
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
											</svg>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-12 w-12 cursor-pointer"
												:class="entry.hasRunningTimer ? '' : 'text-gray-400 hover:text-indigo-500'"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												@click.stop="timerStart(entry)"
												v-else
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
												/>
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="mx-auto h-5 w-5 text-gray-300 hover:text-red-600 cursor-pointer"
												viewBox="0 0 20 20"
												fill="currentColor"
												@click.stop="deleteEntry(entry)"
											>
												<path
													fill-rule="evenodd"
													d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
													clip-rule="evenodd"
												/>
											</svg>
										</div>
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
import { DateTimeMixins } from '@/DateTimeMixins';
import { CreateEntryDto } from '@/dtos/create-entry.dto';
import { ProjectsService } from '@/services/projects.service';
import { EntriesService } from '@/services/entries.service';
import { ProjectEntriesService } from '@/services/projectEntries.service';
import { CategoriesService } from '@/services/categories.service';
import { AuthService } from '@/services/auth.service';

export default {
	mixins: [DateTimeMixins],
	data() {
		return {
			categoriesService: new CategoriesService(),
			projectsService: new ProjectsService(),
			projectEntriesService: new ProjectEntriesService(),
			entriesService: new EntriesService(),
			authService: new AuthService(),
			loading: true,
			categories: [],
			projects: [],
			entries: [],
		};
	},
	computed: {
		project() {
			const { projectId } = this.$route.params;
			if (this.projects.length > 0) return this.projects.find((project) => project.id == projectId);
			return {};
		},
		currentRunningEntry() {
			return this.entries.find((entry) => entry.hasRunningTimer);
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
	async created() {
		await Promise.all([this.getCategories(), this.getEntries(), this.getProjects()]);
		this.loading = false;
		window.addEventListener('beforeunload', this.catchRunningEntryOnExit);
	},
	async beforeDestroy() {
		window.removeEventListener('beforeunload', this.catchRunningEntryOnExit);
		await this.catchRunningEntryOnExit();
	},
	methods: {
		timerStart(entry) {
			if (this.currentRunningEntry) this.currentRunningEntry.stopTimer();
			entry.startTimer();
		},

		timerStop(entry) {
			entry.stopTimer();
			this.saveEntry(entry);
			return entry;
		},

		async catchRunningEntryOnExit() {
			if (this.currentRunningEntry) {
				const stoppedEntry = this.currentRunningEntry.stopTimer();
				await this.saveEntry(stoppedEntry);
			}
		},

		focusInput(node) {
			node.querySelector('textarea').focus();
		},

		filterArray(arr, id) {
			return arr.filter((item) => item.id !== id);
		},

		async getCategories() {
			this.categories = await this.categoriesService.findAll();
			return;
		},

		async getEntries() {
			this.entries = await this.projectEntriesService.findAllByProjectId(this.$route.params.projectId);
			return;
		},

		async getProjects() {
			this.projects = await this.projectsService.findAll();
			return;
		},

		async addEntry() {
			// if any entry is running stop it. Holding off on this for now
			// @ts-ignore
			let entry = new CreateEntryDto({
				projectId: this.project.id,
			});

			this.entries.push(entry);
			this.saveEntry(entry);
		},

		async deleteEntry(entry: CreateEntryDto) {
			const truncatedDesc = entry.description?.substring(0, 20);
			let result = null;
			if (!truncatedDesc) {
				result = window.confirm(`Are you sure you want to delete this entry?`);
			} else {
				result = window.confirm(`Are you sure you want to delete "${truncatedDesc}"?`);
			}

			await this.entriesService.delete(entry.id);
			this.entries = this.filterArray(this.entries, entry.id);
		},

		async saveEntry(entry: CreateEntryDto) {
			let user = this.authService.getUser();
			entry.userId = user.id;

			if (entry.id) await this.entriesService.update(entry);
			else {
				await this.entriesService.create(entry);
				await this.getEntries();

				this.$nextTick(() => {
					const lastIndex = this.$refs.entryRows.length - 1;
					const ref = this.$refs.entryRows[lastIndex];
					this.focusInput(ref);
				});
			}
			return;
		},
	},
	watch: {
		currentRunningEntry(val) {
			if (val) this.$route.meta.currentRunningEntry = val;
			else this.$route.meta.currentRunningEntry = false;
		},
	},
};
</script>

<style></style>
