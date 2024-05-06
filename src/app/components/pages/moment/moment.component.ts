import { MomentService } from './../../../services/moment.service';
import { Moment } from './../../../Moment';
import { ActivatedRoute, } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css'
})
export class MomentComponent implements OnInit{
  moment?: Moment;

  constructor (
    private MomentService: MomentService,
    private route: ActivatedRoute

  ){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.MomentService
    .getMoment(id)
    .subscribe((item) => (this.moment = item.data));
  }

}
