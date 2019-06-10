import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  private baseURL : string = "https://api.themoviedb.org/3/movie/popular?";

  constructor(public http: Http) {
  }

  public getFilmes(){
    return this.http.get(this.baseURL + this.getApikey());
  }

  private getApikey() : string {
    return "api_key=3e6dab4c5064c53cbd54bf643e1e9fea";
  }

}