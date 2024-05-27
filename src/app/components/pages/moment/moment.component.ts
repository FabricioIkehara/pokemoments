import { Comment } from './../../../Comment';
import { CommentService } from './../../../services/comment.service';
import { MessagesService } from './../../../services/messages.service';
import { MomentService } from './../../../services/moment.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
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

  commentForm!: FormGroup

  constructor (
    private MomentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
    private CommentService: CommentService

  ){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.MomentService
    .getMoment(id)
    .subscribe((item) => (this.moment = item.data));

    this.commentForm = new FormGroup({
      text: new FormControl('',[Validators. required]),
      username:  new FormControl('',[Validators. required]),
  })

  }
  get text(){
    return this.commentForm.get('text')!;
  }

  get username(){
    return this.commentForm.get('username')!;
  }

  async removeHandler(id: number){
   await this.MomentService.removeMoment(id).subscribe();

   this.messagesService.add("O Pokemomento foi excluido com sucesso!!!");

   this.router.navigate(['/']);

  }

  async onSubmit(formDirective: FormGroupDirective){

    if (this.commentForm.invalid){
      return
    }

    const data: Comment = this.commentForm.value;

    data.momentId = Number(this.moment!.id);

    await this.CommentService.
    createComment(data)
    .subscribe((comment : any)=> this.moment!.comments!.push(comment.data));

    this.messagesService.add("Comentário adicionado!!!");

    this.commentForm.reset();

    formDirective.resetForm();
}
}
