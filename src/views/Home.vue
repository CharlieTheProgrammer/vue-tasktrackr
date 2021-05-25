<template>
  <div class="flex-grow flex flex-col justify-center items-center text-white bg-gray-300">
    <div class="text-center space-y-8 p-4">
      <div class="text-8xl font-light">TaskTrackr</div>
      <div class="text-xl font-light">A simple web application for keeping track of time spent on projects and tasks</div>
      <div class="w-full">
        <router-link to="/docs" class="block bg-blue-500 p-2 rounded w-1/2 text-center mx-auto">Learn More</router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {
  },
};
</script>
