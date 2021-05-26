<template>
	<div class="max-w-4xl mx-auto w-full">
    <header class="mb-4">
      <h1 class="text-4xl mb-2">Projects</h1>
      <!-- <div class="text-sm text-gray-400">Select a project below</div> -->
    </header>
		<div class="flex flex-col">
			<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
						<table class="min-w-full divide-y divide-gray-200">
							<thead class="bg-gray-50">
								<tr>
									<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
								</tr>
							</thead>
							<tbody class="bg-white divide-y divide-gray-200">
								<tr class="hover:bg-gray-100 cursor-pointer" v-for="project in projects" :key="project.id" @click="test(project.id)">
									<td class="px-6 py-4 whitespace-nowrap">
                    <!-- <router-link to="/projects/${project.id}"> -->
										  {{ project.name }}
                    <!-- </router-link> -->
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

<script>
export default {
	data() {
		return {
			projects: [
				{
					id: 1,
					name: 'Project 1',
					hidden: false,
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
		setCurrrentProjectId: function (key) {
			console.log(key);
			this.$store.dispatch('setCurrrentProjectId', key);
			this.$router.push('home');
		},
    test(id) {
      console.log(id)
    }
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
