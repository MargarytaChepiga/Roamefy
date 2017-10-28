import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//App page references
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

//UI
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Import angularfire and firebase module
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FirebaseProvider } from './../providers/firebase/firebase';
import { AuthProvider } from '../providers/auth/auth';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import { Firebase } from '@ionic-native/firebase';
import { FCM } from '@ionic-native/fcm';

//Firebase datase configuration data
//DO NOT CHANGE ANYTHING
const firebaseConfig = {
  apiKey: "AIzaSyAfAtP5YK9MsFgB7erifiiLX3XT4JouuY0",
  authDomain: "roamefy-app.firebaseapp.com",
  databaseURL: "https://roamefy-app.firebaseio.com",
  projectId: "roamefy-app",
  storageBucket: "roamefy-app.appspot.com",
  messagingSenderId: "844616883402"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    AuthProvider,
    FirebaseServiceProvider,
    Firebase,
    FCM
  ]
})
export class AppModule {}
