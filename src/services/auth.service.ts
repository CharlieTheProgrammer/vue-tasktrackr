import httpService from './http.service';
import jwt_decode from 'jwt-decode';
// Reactive
import { User } from '@/store/user';

export class AuthService {
	user = User;

	constructor() {
		if (this.getUser()) User.isAuthenticated = true;
	}

	async login(login, password) {
		const response = await httpService.post('/auth/login', {
			username: login,
			password,
		});
		this.setToken(response.data.access_token);
		User.isAuthenticated = true;
		return response.data.access_token;
	}

	async logout() {
		this.deleteToken();
		User.isAuthenticated = false;
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
		try {
			let token = this.getToken();
			if (!token) return null;
			let decoded: any = jwt_decode(token);
			return decoded.user;
		} catch (error) {
			return false;
		}
	}

	isUserAuthenticated() {
		return this.user.isAuthenticated;
	}
}
