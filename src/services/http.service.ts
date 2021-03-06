import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

// Important: If axios is used with multiple domains, the AUTH_TOKEN will be sent to all of them.
// See below for an example using Custom instance defaults instead.
// axios.defaults.headers.common['Authorization'] = `Bearer ${'AUTH_TOKEN'}`;

axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(
	function (config) {
		const token = localStorage.getItem('AUTH_TOKEN');
		config.headers.common.Authorization = `Bearer ${token}`;
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response.status === 401) {
			window.location.replace('/login')
		}
		return error;
	}
);

export default axios;
