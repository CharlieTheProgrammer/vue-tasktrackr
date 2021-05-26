<template>
	<div id="header" class="mb-14">
		<!-- MAIN NAVIGATION -->
		<!-- <nav class="navbar" :class="headerBackgroundColor">
			<div class="container-fluid">
				<router-link :to="calcRoute" tag="a" class="h3 mr-auto text-light">TaskTrackr</router-link>
				<button href="#" class="btn btn-secondary m-2" v-if="showGoBackButton" @click="$router.go(-1)">Go Back</button>
				<router-link to="/dashboard" tag="a" class="btn btn-dashboard m-2" v-if="isAuthenticated">Dashboard</router-link>
				<router-link to="/error" tag="a" class="btn btn-primary m-2" v-if="testMode">Error Page</router-link>
				<router-link to="/settings" tag="a" class="btn btn-outline-secondary btn-sm m-2 text-light" v-if="isAuthenticated">Settings</router-link>
				<router-link to="/login" class="btn btn-primary m-2 px-4" v-if="!isAuthenticated">Log In</router-link>
				<router-link to="/signup" id="signupBtn" class="btn btn-primary m-2 px-4" v-if="!isAuthenticated">Signup</router-link>
				<button href="#" class="btn btn-outline-secondary btn-sm m-2 text-light" @click.prevent="logout" v-else>Log Out</button>
				<router-link to="/docs" class="border border-secondary rounded-circle ml-2 px-2 text-warning">?</router-link>
			</div>
		</nav> -->

		<div class="bg-gradient-to-r from-blue-800 to-indigo-900 p-4 shadow-xl">
			<div class="flex justify-between items-center">
				<a href="/" class="text-white text-2xl">TaskTrackr</a>
				<div class="flex items-center space-x-4">
					<button class="text-white border py-1.5 px-2 rounded-lg" v-if="showGoBackButton" @click="$router.go(-1)">Go Back</button>

					<div v-if="isAuthenticated">
						<router-link to="/dashboard" class="text-white border py-1.5 px-4 rounded-lg">Dashboard</router-link>
						<router-link to="/settings" class="text-white border py-1.5 px-4 rounded-lg">Settings</router-link>
						<button class="text-white border py-1.5 px-4 rounded-lg" v-if="isAuthenticated" @click.prevent="logout">Log Out</button>
					</div>
					<div v-else>
						<router-link to="/login" class="text-white border py-1.5 px-4 rounded-lg">Log In</router-link>
						<router-link to="/register" class="text-white border py-1.5 px-4 rounded-lg ml-4">Sign Up</router-link>
					</div>

					<router-link to="/docs" class="text-white border py-1.5 px-2 rounded-full">?</router-link>
				</div>
			</div>
		</div>

		<!-- <div>
			<app-notifications></app-notifications>
		</div> -->
	</div>
</template>

<script>
// import notifications from './notifications/Notifications.vue';
// import { ErrorsBus } from '../main';

export default {
	props: {
		isAuthenticated: {
			type: Boolean,
			required: true,
		},
	},
	components: {
		// 'app-notifications': notifications,
	},
	methods: {
		logout: function () {
			this.$store
				.dispatch('logoutAttempt')
				.then(this.$router.push('/', () => window.location.reload()))
				.catch((err) => ErrorsBus.errorHandler(err));
		},
	},
	computed: {
		// testMode: function () {
		// 	return this.$store.state.testMode;
		// },
		// headerBackgroundColor: function () {
		// 	if (this.testMode) {
		// 		return 'bg-warning';
		// 	}
		// },
		// calcRoute: function () {
		// 	if (this.isAuthenticated) {
		// 		return '/ProjectSelect';
		// 	} else {
		// 		return '/';
		// 	}
		// },
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
