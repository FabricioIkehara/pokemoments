import { MessagesService } from './../../../services/messages.service';
import { Moment } from './../../../Moment';
import { Component } from '@angular/core';
import { MomentService } from '../../../services/moment.service';
import { Router, ActivatedRoute, } from '@angular/router';
import { title } from 'process';


@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrl: './edit-moment.component.css'
})
export class EditMomentComponent {
moment!: Moment;
btnText: string = "Editar";

constructor(
  private momentService: MomentService,
  private route: ActivatedRoute,
  private MessagesService: MessagesService,
  private router: Router
) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
    });


  }
  async eventHandler(momentData : Moment){

      const id = this.moment.id

      const formData = new FormData()

      formData.append('title', momentData.title)
      formData.append('description', momentData.description)

      if (momentData.image){
        formData.append('image', momentData.image);
      }


     await this.momentService.updateMoment(id!, formData).subscribe();

      this.MessagesService.add(`Pokemoment ${id} foi atualizado com sucesso!!!`);

      this.router.navigate(['/']);
  }
}
