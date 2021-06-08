<template>
	<div id="app" class="flex flex-col min-h-screen" :class="{ sky: currentRoute === 'Home' }">
		<v-header :isAuthenticated="isAuthenticated"></v-header>

		<div class="flex-1 flex flex-grow">
			<router-view></router-view>
		</div>

		<v-footer :class="currentRoute === 'Home' ? 'text-gray-100' : 'text-gray-700'"></v-footer>
	</div>
</template>

<script lang="ts">
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import { AuthService } from '@/services/auth.service';

export default {
	components: {
		'v-footer': Footer,
		'v-header': Header,
	},
	data() {
		return {
			authService: new AuthService(),
		};
	},
	computed: {
		isAuthenticated: function () {
			return this.authService.isUserAuthenticated();
		},
		currentRoute() {
			return this.$route.name;
		},
	},
};
</script>

<style lang="scss">
#app {
	font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}

.sky {
	background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/images/Optimized-starrysky.jpg');
	background-size: cover;
	background-position: center top;
	background-repeat: no-repeat;
}
</style>
