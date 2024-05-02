import { MessagesService } from './../../../services/messages.service';
import { MessagesComponent } from './../../messages/messages.component';
import { Moment } from './../../../Moment';
import { MomentService } from './../../../services/moment.service';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';


@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrl: './new-moment.component.css'
})
export class NewMomentComponent implements OnInit{

  btntext = 'Compartilhar!';
  constructor(private momentService: MomentService,
    private MessagesService: MessagesService,
    private router: Router ) {}

  ngOnInit(): void {}


  async createHandler(moment: Moment){
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description)

    if (moment.image)(
      formData.append('image', moment.image)
    )

await this.momentService.createMoment(formData).subscribe();

this.MessagesService.add('Momento adicionado com sucesso');

this.router.navigate(['/']);

 }
}
