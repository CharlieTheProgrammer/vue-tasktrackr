<template>
	<div class="w-full">
		<div class="bg-gray-200 max-w-4xl w-full mx-auto p-10 mt-14 rounded flex-shrink shadow-md">
			<div class="max-w-sm mx-auto space-y-8">
				<div class="text-center space-y-2">
					<h1 class="text-3xl font-semibold">TaskTrackr Login</h1>
					<div class="text-lg font-light">
						or
						<span><router-link to="/register">create a new account</router-link></span>
					</div>
				</div>
				<form action="post" @submit="signIn">
					<div class="grid grid-cols-1 gap-8">
						<label class="block">
							<span class="text-gray-700">Email</span>
							<input
								type="email"
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								placeholder="john@example.com"
								v-model="login"
								required
							/>
						</label>
						<label class="block">
							<span class="text-gray-700">Password</span>
							<input
								type="text"
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								v-model="password"
								required
							/>
						</label>
						<div class="block">
							<div class="mt-2 text-center">
								<button type="submit" class="text-white text-lg bg-green-500 rounded p-3 w-1/2">Login</button>
							</div>
						</div>
						<div class="text-center">
							<router-link to="/forgot-password">Forgot your password?</router-link>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { AuthService } from '../services/auth.service';

export default Vue.extend({
	data() {
		return {
			login: '',
			password: '',
			authService: new AuthService(),
		};
	},
	methods: {
		async signIn(evt) {
			evt.preventDefault();
			return await this.authService.login(this.login, this.password);
		},
	},
});
</script>
