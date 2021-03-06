import { Component, OnInit } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  description = null;
  lat = null;
  long = null;

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude
        this.long = position.coords.longitude
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  handleClick(){
    this.dataService.sendHelpRequest(this.description, this.lat, this.long).subscribe(data => {
      console.log(data);
      let newId = data['emergency_id']
      this.router.navigateByUrl('/patient-dashboard/orderDetails/' + newId);
    })
  }

}
