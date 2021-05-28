<template>
	<div class="w-full">
		<div class="bg-gray-200 max-w-4xl w-full mx-auto p-10 mt-14 rounded flex-shrink shadow-md">
			<div class="max-w-sm mx-auto space-y-8">
				<div class="text-center space-y-2">
					<h1 class="text-3xl font-semibold">Create an Account</h1>
					<div class="text-lg font-light">
						or
						<span><router-link to="/login">sign into your account</router-link></span>
					</div>
				</div>

				<div class="grid grid-cols-1 gap-8">
					<label class="block">
						<span class="text-gray-700">Login</span>
						<input
							type="email"
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
							placeholder="john@example.com"
						/>
					</label>
					<label class="block">
						<span class="text-gray-700">Password</span>
						<input type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
					</label>
					<label class="block">
						<span class="text-gray-700">Confirm Password</span>
						<input type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
					</label>
					<div class="block">
						<div class="mt-2 text-center">
							<button class="text-white text-lg bg-green-500 rounded p-3 w-1/2">Sign up</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
