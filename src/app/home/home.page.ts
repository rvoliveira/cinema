import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
//import { FilmesService } from '../filmes.service';
import { Http } from '@angular/http';
declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  map: any;
  dados: any[];
  automaticClose = false;
  openf = false;
  openc = false;
  public lista_Filmes: Array<any>;
  private baseURL : string = "https://api.themoviedb.org/3/movie/popular?";

  constructor(private geolocation: Geolocation, private http: HttpClient, public FilmesServico: Http) {
    this.http.get('assets/bdcinema.json').subscribe(res => {
      this.dados = res['itens'];
      this.dados[0].open = false;
      this.criarMap(this.dados);    
    });
    this.criarobj();   
  }
  
  toggleOpcaoF (){
    this.openf = !this.openf;
  }

  toggleOpcaoC (){
    this.openc = !this.openc;
  }

  toggleFilmes (index){
    this.lista_Filmes[index].open = !this.lista_Filmes[index].open;
    if (this.automaticClose && this.lista_Filmes[index].open){
      this.lista_Filmes
      .filter((item, itemIndex) => itemIndex != index)
      .map(item => item.open = false);
    }
  }


  criarobj(){    
    this.FilmesServico.get(this.baseURL + this.getApikey()).subscribe(
      data => {
        const film = (data as any);
        const film_json = JSON.parse(film._body);
        this.lista_Filmes = film_json.results;
        console.log(this.lista_Filmes);
      }, error => {
        console.log(error);
      }
    )
  }


  toggleSection (index){
    this.dados[index].open = !this.dados[index].open;
    if (this.automaticClose && this.dados[index].open){
      this.dados
      .filter((item, itemIndex) => itemIndex != index)
      .map(item => item.open = false);
    }
  }

  toggleItem (index, childIndex){
    this.dados[index].children[childIndex].open = !this.dados[index].children[childIndex].open;
  }
  
  criarMap(dados: any) {
    this.geolocation.getCurrentPosition()
    .then((resp) => {
      var directionsDisplay = new google.maps.DirectionsRenderer();
      var startPosition = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      var destinationPosition;
      const mapOptions = {
        //zoom: 12.5,
        zoom: 9,
        center: startPosition,
      }
      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);        
      new google.maps.Marker({
        position: startPosition, 
        map: this.map,
        title: 'VOCÊ',
        //icon: './assets/icon/icon.png'
      });        
      for (var i = 0; i < dados.length; i++) {
        for (var j = 0; j < dados[i].children.length; j++) {
          destinationPosition = new google.maps.LatLng(dados[i].children[j].latitude, dados[i].children[j].longitude);
          new google.maps.Marker({
            position: destinationPosition, 
            map: this.map,
            title: dados[i].children[j].name,
            //icon: './assets/icon/icon.png'       

          });
        }
      }
      directionsDisplay.setMap(this.map);              
    }).catch((error) => {
      console.log('Erro ao recuperar sua posição', error);
    });
  }

  private getApikey() : string {
    return "api_key=3e6dab4c5064c53cbd54bf643e1e9fea";
  }


}
