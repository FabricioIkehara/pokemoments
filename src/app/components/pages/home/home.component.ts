import { MomentService } from './../../../services/moment.service';
import { Moment } from './../../../Moment';
import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  allMoments: Moment[] = []
  moments: Moment[] = []
  baseApiUrl = environment.baseApiUrl

  constructor(private momentService: MomentService) {}

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) =>{

      const data = items.data

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString(
          'pt-BR'
        );
      });

      this.allMoments = data;
      this.moments = data;

    });

  }
}
