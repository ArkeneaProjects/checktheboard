import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { serverUrl } from 'src/app/config';
//import { jwtDecode } from "jwt-decode";
//import { map } from 'rxjs/operators'; 

interface TokenResponse {
  status: string,
  data: {
    token: string
    userId: string
    username: string
  }
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  isUserLoggedIn(): boolean {
    const token = localStorage.getItem('user');
    return !!token; // Returns true if token is present, false otherwise.
  }

  logout(userType: string): void {
    localStorage.removeItem('user');
    if (userType == 'patient') {
      window.location.href = '/'
    } else {
      window.location.href = '/admin/login'
    }
  }

  hasRole(role: string): boolean {
    if (role) {
      let user_type = this.getLoggedInInfo('role')
      if (user_type == role) {
        return true
      }
      else {
        return false
      }
    } else {
      return true
    }
  }

  getLoggedInInfo(column = 'all') {
    let data: any
    let storage: any
    storage = localStorage.getItem('user') ? localStorage.getItem('user') : null
    let user_details = JSON.parse(storage);
    if (user_details && user_details != null) {
      if (column == 'all') {
        data = user_details
      } else {
        data = user_details[column]
      }
      return data
    }
  }

  getFullName() {
    return this.getLoggedInInfo('firstName') + " " + this.getLoggedInInfo('lastName')
  }

  isTokenExpired(): boolean {
    let userData: any = localStorage.getItem('user');
    userData = (userData && userData != null) ? JSON.parse(userData) : null
    if (userData == null || userData.token == "" || userData.token == undefined) {
      return true
    }
    const decodedToken: any = '' //= jwtDecode(userData.token);
    const expirationTime = decodedToken.exp * 1000;
    return Date.now() >= expirationTime;
  }
  
  //function to get token from localStorage
  getToken(): string {
    let accessToken = this.getKeyFromStorage('userToken')
    return accessToken
  }

  //function to get key from storages
  private getKeyFromStorage(key: any): any {
    if (localStorage.getItem(key)) {
      return localStorage.getItem(key)
    } else if (sessionStorage.getItem(key)) {
      return sessionStorage.getItem(key)
    }
    return "";
  }

  //function to make request to server
  public apiRequest(method: any, apiUrl: any, req_vars: any): Observable<any> {
    return this.request(method, apiUrl, req_vars)
  }

  //function to make request from frontend
  private request(method: 'post' | 'get', type: string, data?: any): Observable<TokenResponse> {
    let base
    if (method === 'post') {
      base = this.http.post(serverUrl + `/api/${type}`, data)
    } else {
      base = this.http.get(serverUrl + `/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` } })
    }
    const request = base.pipe(
      map((response: any) => {
        return response
      })
    )
    return request
  }

}
