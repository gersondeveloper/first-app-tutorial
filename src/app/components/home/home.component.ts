import {Component, inject} from '@angular/core';
import {HousingLocationComponent} from "../housing-location/housing-location.component";
import {NgForOf} from "@angular/common";
import {HousingService} from "../../services/housing.service";
import {HousingLocation} from "../../interfaces/housinglocation";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HousingLocationComponent,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  housingService: HousingService = inject(HousingService);
  housingLocationList!: HousingLocation[]


  filteredLocationList: HousingLocation[] | undefined = [];

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }

}
