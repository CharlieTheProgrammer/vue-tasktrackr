<template>
	<div id="header" class="mb-14">
		<!-- MAIN NAVIGATION -->
		<div class="bg-gradient-to-r from-blue-800 to-indigo-900 p-4 shadow-xl">
			<div class="flex justify-between items-center">
				<a href="/" class="text-white text-2xl">TaskTrackr</a>
				<div class="flex items-center space-x-4">
					<button class="text-white border py-1.5 px-2 rounded-lg" v-if="showGoBackButton" @click="$router.go(-1)">Go Back</button>

					<div v-if="isAuthenticated" class="space-x-4">
						<router-link to="/dashboard" class="text-white border py-1.5 px-4 rounded-lg">Dashboard</router-link>
						<router-link to="/settings" class="text-white border py-1.5 px-4 rounded-lg">Settings</router-link>
						<button class="text-white border py-1.5 px-4 rounded-lg" v-if="isAuthenticated" @click.prevent="logout">Log Out</button>
					</div>
					<div v-else class="space-x-4">
						<router-link to="/login" class="text-white border py-1.5 px-4 rounded-lg">Log In</router-link>
						<router-link to="/register" class="text-white border py-1.5 px-4 rounded-lg">Sign Up</router-link>
					</div>

					<router-link to="/docs" class="text-xs text-white border py-1 px-2 rounded-full">?</router-link>
				</div>
			</div>
		</div>

		<!-- <div>
			<app-notifications></app-notifications>
		</div> -->
	</div>
</template>

<script>
import { AuthService } from '../services/auth.service';

export default {
	props: {
		isAuthenticated: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	data() {
		return {
			authService: new AuthService(),
		};
	},

	methods: {
		async logout() {
			await this.authService.logout();
			this.$router.push('/');
		},
	},
	computed: {
		showGoBackButton: function () {
			if (this.$route.path == '/home' || this.$route.path == '/') {
				return false;
			} else {
				return true;
			}
		},
	},
};
</script>

<style scoped></style>
