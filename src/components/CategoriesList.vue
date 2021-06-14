<template>
	<section>
		<header class="mb-4 flex justify-between items-center">
			<h1 class="text-4xl mb-2">Categories</h1>
			<!-- <div class="text-sm text-gray-400">Select a category below</div> -->
			<button class="text-xs rounded px-2 py-2 bg-indigo-200" @click.stop="addCategory()">Add New Category</button>
		</header>
		<div class="" v-if="!loading && categories.length === 0">You have no categories. Please add a new category.</div>
		<div class="flex flex-col" v-else>
			<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
						<table class="min-w-full divide-y divide-gray-200">
							<thead class="bg-gray-50">
								<tr>
									<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
									<th scope="col" class="relative px-6 py-3">
										<span class="sr-only">Edit</span>
									</th>
								</tr>
							</thead>
							<tbody class="bg-white divide-y divide-gray-200">
								<tr class="animate-pulse" v-if="loading">
									<td class="pl-6 py-4 whitespace-nowrap rounded-md">
										<div class="bg-gray-200 h-8 w-full"></div>
									</td>
									<td class="pr-6 py-4 whitespace-nowrap rounded-md">
										<div class="bg-gray-200 h-8 w-full"></div>
									</td>
								</tr>
								<tr class="hover:bg-gray-100" v-for="category in categories" :key="category.id" ref="categoryRows" v-else>
									<td class="px-6 py-4 whitespace-nowrap">
										<label class="block" v-if="category.editable">
											<input
												type="email"
												class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
												v-model="category.name"
												v-on:keyup.enter="saveCategory(category)"
											/>
										</label>
										<div v-else>
											{{ category.name }}
										</div>
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
										<button
											type="button"
											class="text-indigo-600 hover:text-indigo-900 focus:outline-none"
											@click="category.editable = !category.editable"
											v-if="!category.editable"
										>
											Edit
										</button>
										<button type="button" class="text-green-600 hover:text-green-900 focus:outline-none" @click.stop="saveCategory(category)" :disabled="!category.name" v-else>
											Save
										</button>
										<button type="button" class="text-gray-400 hover:text-red-600 focus:outline-none" @click.stop="deleteCategory(category)">Delete</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { CreateCategoryDto } from '@/dtos/create-category.dto';
import { CategoriesService } from '@/services/categories.service';
import { AuthService } from '@/services/auth.service';

export default {
	data() {
		return {
			categoriesService: new CategoriesService(),
			authService: new AuthService(),
			loading: true,
			categories: [
				// {
				// 	id: 1,
				// 	name: 'Category 1',
				// 	hidden: false,
				// 	editable: false,
				// },
				// {
				// 	id: 2,
				// 	name: 'Category 2',
				// 	hidden: false,
				// 	editable: false,
				// },
				// {
				// 	id: 3,
				// 	name: 'Category 3',
				// 	hidden: false,
				// },
				// {
				// 	id: 4,
				// 	name: 'Category 4',
				// 	hidden: false,
				// },
			],
		};
	},
	// Note: I can use async here, but be careful because Vue will treat this as sync
	// meaning it will not wait for this code to finish before other steps, like rendering, etc
	// This is where a loading state becomes useful.
	async created() {
		await this.getCategories();
		this.loading = false;
	},
	methods: {
		focusInput(node) {
			node.querySelector('input').focus();
		},

		hasEmptyName(items): number {
			return items.findIndex((item) => item.name === '');
		},

		filterArray(arr, id) {
			return arr.filter((item) => item.id !== id);
		},

		handleEmptyName() {
			this.$nextTick(() => {
				const ref = this.$refs.categoryRows[this.hasEmptyName(this.categories)];
				this.focusInput(ref);
			});
		},

		async getCategories() {
			let categories = await this.categoriesService.findAll();
			categories = categories.map((category) => {
				category.editable = false;
				return category;
			});
			this.categories = categories;
			return;
		},

		addCategory() {
			if (this.hasEmptyName(this.categories) > -1) return this.handleEmptyName();

			let category = new CreateCategoryDto();
			// @ts-ignore
			category.editable = true;
			this.categories.push(category);

			this.$nextTick(() => {
				const lastIndex = this.$refs.categoryRows.length - 1;
				const ref = this.$refs.categoryRows[lastIndex];
				this.focusInput(ref);
			});
		},

		async deleteCategory(category) {
			const result = window.confirm(`Are you sure you want to delete ${category.name}?`);
			if (result && category.id) {
				let res = await this.categoriesService.delete(category.id);
				this.categories = this.filterArray(this.categories, category.id);
			} else if (result) this.categories = this.filterArray(this.categories, category.id);
		},

		async saveCategory(category: CreateCategoryDto, index) {
			if (this.hasEmptyName(this.categories) > -1) return this.handleEmptyName();
			// TODO: This needs to be moved to the backend?
			let user = this.authService.getUser();
			category.userId = user.id;
			// @ts-ignore
			category.editable = !category.editable;

			if (category.id) await this.categoriesService.update(category);
			else {
				await this.categoriesService.create(category);
				await this.getCategories();
			}
			return;
		},
	},
};
</script>

<style></style>
