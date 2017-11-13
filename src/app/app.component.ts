import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FirebaseProvider } from '../providers/firebase/firebase';

import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { InitialConfigurationPage } from '../pages/initial-configuration/initial-configuration';
import { InitialConfigurationTwoPage } from '../pages/initial-configuration-two/initial-configuration-two';

import { OneSignal } from '@ionic-native/onesignal';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  activePage: any;
  userID: string;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, afAuth: AngularFireAuth, public statusBar: StatusBar, public splashScreen: SplashScreen, 
    public firebaseProvider: FirebaseProvider, public oneSignal: OneSignal) {
    const authObserver = afAuth.authState.subscribe( user => {
      if (user) {
        this.userID = user.uid;
        this.rootPage = HomePage;
        authObserver.unsubscribe();
       
      } else {
        this.userID = null;
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      }

     
      
    });

    this.initializeApp();

    
    this.pages = [
      { title: "Home", component: HomePage },
      { title: "Interests", component: InitialConfigurationPage },
      { title: "Time and Distance", component: InitialConfigurationTwoPage }
    ];

    this.activePage = this.pages[0];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      var notificationOpenedCallback = function(jsonData) {
        alert('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      this.oneSignal.startInit('e979d775-d7e2-46e7-88c9-864d62ac51b2', '844616883402');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      
      this.oneSignal.handleNotificationReceived().subscribe(() => {
       // do something when notification is received
      });
      
      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
      });
      
      this.oneSignal.endInit();  
     

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  logout() {
    this.rootPage = LoginPage;
    this.nav.setRoot(LoginPage);
    this.firebaseProvider.logoutUser();
  }

  checkActive(page){
    return page = this.activePage;
  }

}
