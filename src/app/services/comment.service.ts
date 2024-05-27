import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Response } from 'express';
import { Comment } from '../Comment';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}api/moments`;

  constructor(private http: HttpClient) { }

  createComment(data: Comment): Observable<Response<Comment>>{
    const url = `${this.apiUrl}/${data.momentId}/comments`
    return this.http.post<Response<Comment>>(url, data);
  }
}
