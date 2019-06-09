import { Component, OnInit, Input } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-objeto',
  templateUrl: './objeto.component.html',
  styleUrls: ['./objeto.component.scss'],
})
export class ObjetoComponent implements OnInit {

  @Input('objeto') objeto: any;
  constructor(private toastCtrl: ToastController) { }

  ngOnInit() {}

  async buyItem(objeto){
    let toast = await this.toastCtrl.create({
      message: `Adicionado a lista de: ${objeto.name}`
    });
    toast.present();
  }
}
