<template>
	<div id="app" class="flex flex-col min-h-screen">
    <v-header :isAuthenticated="false"></v-header>

		<div class="flex-1 flex flex-grow">
			<router-view></router-view>
		</div>

    <v-footer></v-footer>
	</div>
</template>

<script>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';

export default {
	components: {
    'v-footer': Footer,
    'v-header': Header
  },
	data: function () {
		return {
      
    };
	},
	computed: {
		isAuthenticated: function () {
			return this.$store.getters.isAuthenticated;
		},
		footerClasses: function () {
			if (this.$route.path == '/') {
				return 'text-light';
			} else {
				return 'text-dark';
			}
		},
		footerStyle: function () {
			if (this.$route.path == '/') {
				return 'position: fixed;';
			} else {
				return 'position: relative;';
			}
		},
	},
	methods: {
		logState: function () {
			console.log(this.$store.state);
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
</style>
