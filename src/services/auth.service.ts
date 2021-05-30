import httpService from './http.service';
import jwt_decode from 'jwt-decode';

export class AuthService {
	constructor() {}

	async login(login, password) {
		const response = await httpService.post('/auth/login', {
			username: login,
			password,
		});
		this.setToken(response.data.access_token);
		return;
	}

	async logout() {
		const response = await httpService.get('/auth/logout');
		this.deleteToken();
		return;
	}

	setToken(token) {
		return localStorage.setItem('AUTH_TOKEN', token);
	}

	getToken() {
		return localStorage.getItem('AUTH_TOKEN');
	}

	deleteToken() {
		return localStorage.removeItem('AUTH_TOKEN');
	}

	getUser() {
		let token = this.getToken();
		if (!token) return null;
		let decoded: any = jwt_decode(token);
		return decoded.user;
	}
}
