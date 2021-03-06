import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

const API_PATH = 'http://192.168.166.171:5000';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  sendHelpRequest(description, lat, long){
    let token = this.authService.getToken();
    let body = {
      token,
      description,
      lat,
      long
    }
    return this.http.post(API_PATH + '/emergency', body);
  }

  sendReview(rating, emergency_id, description){
    return this.http.post(API_PATH + '/rate', {token: this.authService.getToken(), rating, emergency_id, description})
  }

  getPendingOrders(){
    return this.http.post(API_PATH + '/getEmergencies', {token: this.authService.getToken()})
  }

  getUserData(id){
    return this.http.get(API_PATH + '/user/' + id);
  }

  getOrdersHistory(){
    let token = this.authService.getToken();
    let body = {
      token
    }
    return this.http.post(API_PATH + '/getMyEmergencies', body);
  }

  getOrderById(id){
    let body = {
      emergency_id: id,
      token: this.authService.getToken()
    }
    return this.http.post(API_PATH + '/getEmergencyById', body);
  }
}
