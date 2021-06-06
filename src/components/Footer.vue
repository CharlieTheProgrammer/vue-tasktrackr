<template>
	<footer class="footer">
		<div class="p-2 text-sm text-center font-semibold">
			<span>&copy; {{ year }} Charlie The Programmer</span>
		</div>
	</footer>
</template>

<script>
export default {
	computed: {
		year() {
			return new Date().getFullYear();
		},
	},
};
</script>

<style></style>
