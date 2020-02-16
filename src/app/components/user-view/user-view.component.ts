import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { client_table } from 'src/app/models/Clients';
import { Router } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import Swal from 'sweetalert2';
import { property_table } from 'src/app/models/Properties';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UserView implements OnInit {

  matchesList: any[];
  currUser: client_table;
  getMatchesSubscriber: any;
  

  constructor(private loginService: LoginService, private router: Router, private propertyService: PropertyService) {
    
  }

  ngOnInit() {
    this.currUser = this.loginService.getCurrentUser();

    this.getMatchesSubscriber = this.propertyService.GetMatches(this.currUser && this.currUser.client_id || '').subscribe(
      data => {
        this.matchesList = data;//get matching properties for current user
        this.propertyService.GetFirstImages().subscribe(images => {
          images.forEach(img => {
            let property = this.matchesList.find(x => x.property_code == img.image_property_code);
            if (property) {
              property.imgName = img.image_link;
            }
          })
        })

      },
      error => {
        Swal.fire('Error');
        this.propertyService.GetProperties().subscribe(data => {
          this.matchesList = data; //get matching properties for current user
          this.propertyService.GetFirstImages().subscribe(images => {
            images.forEach(img => {
              let property = this.matchesList.find(x => x.property_code == img.image_property_code);
              if (property) {
                property.imgName = img.image_link;
              }
            })
          })
        })
      }
    )

  }

  editexep() {
    this.router.navigate(['/exptetion', this.currUser.client_id]);
  
}
editprop(){
  this.router.navigate(['/add-property',this.currUser.client_id]);

}
goprop(prop:property_table){
   this.router.navigate(['/view-property',prop.property_code]);
}

  DisplayNumberWithCommas(num: number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  editExpectation() {
    this.router.navigate(['/exptetion']);
  }
editProperty(){

}
editUser(){

}

}
