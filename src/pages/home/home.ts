import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { FirebaseProvider } from './../../providers/firebase/firebase';

import { LoginPage } from '../login/login'
import { Platform } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public authData: AuthProvider, public navCtrl: NavController, public firebaseProvider: FirebaseProvider, private fcm:FCM, private platform:Platform) {
    this.onNotification();
  }

  async onNotification() {
    try {
      await this.platform.ready();
      
      this.fcm.onNotification().subscribe(data=>{
          if(data.wasTapped){
            alert("Received in background");
            console.log("Received in background");
          } else {
            alert("Received in foreground");
            console.log("Received in foreground");
          };
        })
    }
    catch (e) {
      console.error(e);
    }
  }

  
  logout() {
    this.authData.logoutUser();
    this.navCtrl.setRoot(LoginPage);
  }

}
