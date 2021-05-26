<template>
	<div class="w-full max-w-6xl mx-auto">
		<header class="mb-10">
			<div class="flex justify-between items-center">
				<div class="text-center">
					<div class="text-5xl font-light">Timer</div>
					<div class="text-6xl">00:00:00</div>
				</div>
				<div>
					<button class="rounded px-4 py-4 bg-gray-100">New Entry</button>
				</div>
			</div>
		</header>

		<section>
			<!-- Project nav -->
			<div class="bg-gray-100 hidden">
				<div class="flex justify-between items-center p-4 mx-xl-5">
					<p class="text-4xl font-weight-normal">{{ project.name }}</p>
					<button class="rounded px-4 py-4 bg-indigo-200">Change Project</button>
				</div>
			</div>
			<!-- <hr /> -->
			<!-- Popup Modal Window For Nav-->
			<div></div>

			<div class=" mx-auto w-full">
				<header class="mb-4 flex justify-between items-center">
					<h1 class="text-4xl mb-2">Entries</h1>
					<button class="rounded px-2 py-2 bg-indigo-200">Change Project</button>
				</header>
				<div class="flex flex-col">
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
										</tr>
									</thead>
									<tbody class="bg-white divide-y divide-gray-200">
										<!-- <tr class="hover:bg-gray-100 cursor-pointer" v-for="project in projects" :key="project.id" @click="test(project.id)">
											<td class="px-6 py-4 whitespace-nowrap">
												{{ project.name }}
											</td>
										</tr> -->
										<tr v-for="entry in project.entries" :key="entry.id">
											<td class="py-4">
												<select class="m-2.5 rounded-md border border-indigo-100 w-full">
													<option v-for="(category, index) in project.categories" :key="index" :selected="entry.categoryId == category.id ? 'selected' : null" :value="category.id">
														{{ category.name }}
													</option>
												</select>
											</td>
											<td class="text-center text-gray-400">{{ entry.startTime | toDateFormat }}</td>
											<td>
												<textarea class="w-full m-2.5 rounded-md border border-indigo-100" :value="entry.description"> </textarea>
											</td>
											<td class="text-center text-gray-400">{{ entry.startTime | toTimeFormat }}</td>
											<!-- <td v-if="displayEndTime" class="text-center d-none d-sm-table-cell">{{ entry.total_time | toTimeFormat }}</td> -->
											<td class="text-center text-gray-500">{{ entry.startTime | generateTotalTime(entry.endTime) }}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import { DateTime } from 'luxon';

export default {
	data() {
		return {
			project: {
				id: 1,
				name: 'Project 1',
				hidden: false,
				categories: [
					{
						id: 1,
						userId: 1,
						name: 'Testing',
						hidden: false,
					},
					{
						id: 2,
						userId: 1,
						name: 'Planning',
						hidden: false,
					},
					{
						id: 3,
						userId: 1,
						name: 'Deploying',
						hidden: false,
					},
				],
				entries: [
					{
						id: 1,
						projectId: 1,
						categoryId: 1,
						userId: 1,
						description: 'Some text',
						startTime: '2021-05-26T21:37:20.430Z',
						endTime: '2021-05-26T21:56:20.430Z',
					},
					{
						id: 2,
						projectId: 1,
						categoryId: 1,
						userId: 1,
						description: 'lorem',
						startTime: '2021-05-26T21:37:20.430Z',
						endTime: '2021-05-26T21:56:20.430Z',
					},
					{
						id: 3,
						projectId: 1,
						categoryId: 1,
						userId: 1,
						description: 'I am the third entry',
						startTime: '2021-05-26T21:37:20.430Z',
						endTime: '2021-05-26T21:56:20.430Z',
					},
				],
			},
		};
	},
	filters: {
		generateTotalTime(startTime, endTime) {
      const sTime = DateTime.fromISO(startTime);
      const eTime = DateTime.fromISO(endTime);
			const diffTime = eTime.diff(sTime, 'minutes')
			return `${diffTime.minutes}m${diffTime.seconds}s`;
		},
		toTimeFormat(time) {
			return DateTime.fromISO(time).toLocaleString(DateTime.TIME_SIMPLE);
		},
		toDateFormat(time) {
			return DateTime.fromISO(time).toLocaleString(DateTime.DATE_MED);
		},
	},
};
</script>
