import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserEvent } from '../../models/event/userevent.model';
import { FirebaseProvider } from '../../providers/firebase/firebase'
import { Subscription } from 'rxjs/Subscription'
import { UserEventsPage } from '../user-events/user-events'

@IonicPage(
  {
    name: 'AddEventPage'
  }
)
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {
    event: UserEvent = {
      name: null,
      description: null,
      price: 0,
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      address: null, // change to Address object TODO: need to add a geocoder to get lat/lon AND auto-complete
      latitude: null,
      longitude: null,
      website: null,
      phone: null,
      host: null,
      categories: []
    };

  interest: any[] = [];
  categories: any[] = [];
  subscription: Subscription;
  userID: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebase: FirebaseProvider) {
    this.subscription = this.firebase.getInterestList().subscribe(x => {
      this.interest = x;
    });
    this.userID = this.firebase.getUserId();
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }

  addEvent(event: UserEvent, categories) {
    event.categories = categories
    event.host = this.userID;
    this.firebase.addEvent(event);
    this.navCtrl.setRoot(UserEventsPage)
  }
  
  cancel(){
    this.navCtrl.setRoot(UserEventsPage)
  }

  ngOnDestroy() {
    this.interest = [];
    this.subscription.unsubscribe();
  }
}
