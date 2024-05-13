import { MessagesService } from './../../../services/messages.service';
import { MomentService } from './../../../services/moment.service';
import { Moment } from './../../../Moment';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css'
})
export class MomentComponent implements OnInit{
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;

  faTimes = faTimes;
  faEdit = faEdit;

  constructor (
    private MomentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router

  ){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.MomentService
    .getMoment(id)
    .subscribe((item) => (this.moment = item.data));
  }

  async removeHandler(id: number){
   await this.MomentService.removeMoment(id).subscribe();

   this.messagesService.add("O Pokemomento foi excluido com sucesso!!!");

   this.router.navigate(['/']);

  }
}
