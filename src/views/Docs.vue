<template>
	<div class="w-full pb-4">
		<div class="flex flex-col text-white space-y-14">
			<section class="bg-blue-900 w-full">
				<div class="max-w-screen-xl p-10 mx-auto">
					<div class="text-5xl font-semibold mb-2">Create Many Projects</div>
					<div class="w-full flex">
						<div class="w-2/3">
							<video autoplay="true" loop="true" src="@/assets/images/Creating_Projects.mp4" width="700px" class="block py-4"></video>
						</div>
						<div class="space-y-3 mt-4 pl-2 w-1/3">
							<div class="text-xl font-semibold">To Create a Project</div>
							<ol>
								<li>Click on Settings in the top menu.</li>
								<li>Click on the Add Project button.</li>
								<li>Enter a project name and then click on the Save Changes button</li>
							</ol>

							<div class="text-xl font-semibold">To Edit a Project Name</div>
							<ol>
								<li>Click on Settings in the top menu.</li>
								<li>Click on the Edit button.</li>
								<li>Enter a project name and then click on the Save button</li>
							</ol>

							<div class="text-xl font-semibold">To Delete a Project</div>
							<ol>
								<li>Click on Settings in the top menu.</li>
								<li>Click on the Delete button. A pop-up will appear to confirm deletion.</li>
							</ol>
						</div>
					</div>
				</div>
			</section>

			<section class="bg-blue-900 w-full">
				<div class="max-w-screen-xl p-10 mx-auto">
					<div class="text-5xl font-semibold mb-2">Create Categories to Organize Tasks</div>
					<div class="w-full flex">
						<div class="w-2/3">
							<video autoplay="true" loop="true" src="@/assets/images/Creating_Categories.mp4" width="700px" class="block py-4"></video>
						</div>
						<div class="space-y-3 mt-4 pl-2 w-1/3">
							<div class="text-xl font-semibold">To Create a Category</div>
							<ol>
								<li>Click on Settings in the top menu.</li>
								<li>Click on the Add Category button.</li>
								<li>Enter a category name and then click on the Save Changes button</li>
							</ol>

							<div class="text-xl font-semibold">To Edit a Category Name</div>
							<ol>
								<li>Click on Settings in the top menu.</li>
								<li>Click on the Edit button.</li>
								<li>Enter a category name and then click on the Save button</li>
							</ol>

							<div class="text-xl font-semibold">To Delete a Category</div>
							<ol>
								<li>Click on Settings in the top menu.</li>
								<li>
									Click on the Delete button. A pop-up will appear to confirm deletion. Existing entries with deleted category will continue to maintain the deleted category, but
									will disappear if another category is selected. Deleted category will not appear for new entries.
								</li>
							</ol>
						</div>
					</div>
				</div>
			</section>

			<section class="bg-blue-900 w-full">
				<div class="max-w-screen-xl p-10 mx-auto">
					<div class="text-5xl font-semibold mb-2">Managing Entries</div>
					<div class="w-full flex">
						<div class="w-2/3">
							<video autoplay="true" loop="true" src="@/assets/images/Using_Application.mp4" width="700px" class="block py-4"></video>
						</div>
						<div class="space-y-3 mt-4 pl-2 w-1/3">
							<div class="text-xl font-semibold">Working with Entries</div>
							<ol>
								<li>Click on the New Entry button to start the timer and insert a new entry.</li>
								<li>Click on the Log Time button to complete the entry's end time. You can adjust the category and description at any time.</li>
							</ol>

							<div class="text-xl font-semibold">Switching Projects</div>
							<ol>
								<li>Click on the Change Project button. This will bring up a pop-up with a list of your projects.</li>
								<li>Click on the project to switch to it.</li>
							</ol>
						</div>
					</div>
				</div>
			</section>
		</div>

		<section class="bg-gray-200 text-center my-14 mx-auto max-w-screen-xl rounded" v-if="!isAuthenticated">
			<div class="space-y-4 p-20">
				<h1 class="text-7xl font-light">Start Time Tracking Today</h1>
				<p class="text-lg font-light w-75 mx-auto px-4">TaskTrackr allows you to create projects, assign categories, and keep track of all your time spent.</p>
				<div class="flex justify-center items-center w-full text-white">
					<router-link to="/register" class="text-xl tracking-wide bg-green-500 p-4 rounded my-3 w-1/2">Sign up</router-link>
				</div>
			</div>
		</section>

	</div>
</template>

<script>
import { AuthService } from '@/services/auth.service';

export default {
	data() {
		return {
			authService: new AuthService()
		}
	},
	computed: {
		isAuthenticated() {
			return this.authService.isUserAuthenticated();
		}
	}
}
</script>

<style lang="scss" scoped>
li {
	@apply text-lg font-light list-decimal ml-8;
}

ol {
	@apply space-y-3;
}
</style>
