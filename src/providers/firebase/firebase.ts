import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import { UserEvent } from "../../models/event/userevent.model";

@Injectable()
export class FirebaseProvider {
  userID: string;

  constructor(public afAuth: AngularFireAuth, public afd: AngularFireDatabase) {
    const authObserver = afAuth.authState.subscribe( user => {
      if (user) {
        this.userID = user.uid;
        authObserver.unsubscribe();
      } else {
        this.userID = null;
        authObserver.unsubscribe();
      }
    });
  }
  
  loginUser(newEmail: string, newPassword: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword)
      .then(() => this.userID = this.afAuth.auth.currentUser.uid);
   }

   resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
   }

   logoutUser() {
    return this.afAuth.auth.signOut()
    .then(() => console.log("user logged out"))
    .catch(e => console.log("exception: " + e));
   }

   signupUser(newEmail: string, newPassword: string, newFirstName: string, newLastName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword)
    .then(() => {
        this.afAuth.auth.currentUser.sendEmailVerification()
        .then(() => {
          console.log('verification email sent');
        });
        this.addNewUserProfile(this.afAuth.auth.currentUser.uid, newFirstName, newLastName);
        //this.logoutUser();
    });
  }
  
   //user information while registration
   addNewUserProfile(newId, newFirstName, newLastName) {
    var user = this.afd.app.auth().currentUser;
    var usersRef = this.afd.app.database().ref("users");
    if (user) {
      usersRef.child(user.uid).set({ 
        firstName: newFirstName,
        lastName: newLastName,
        joinDate: new Date().getDate(),
        Configured: false
      });
    }
  }

  editUserProfile(newEmail: string, newFirstName: string, newLastName: string): Promise<any> {
    return this.afAuth.auth.currentUser.updateEmail(newEmail)
    .then(() => {
        this.afAuth.auth.currentUser.sendEmailVerification()
        .then(() => {
          console.log('verification email sent');
        });
        this.updateUser(this.afAuth.auth.currentUser.uid, newFirstName, newLastName);
        //this.logoutUser();
    });
  }

  updateUser(Id, FirstName, LastName) {
    var user = this.afd.app.auth().currentUser;
    var usersRef = this.afd.app.database().ref("users");
    if (user) {
      usersRef.child(user.uid).update({ 
        firstName: FirstName,
        lastName: LastName
      });
    }
  }

  getObject(){
    return this.afd.object(`users/${this.userID}/`);
  }

  configureUser(id){
    this.afd.app.database().ref('users').child(this.userID).child('Configured').set(true);
  }

  isUserConfigured(id){
    var db = this.afd.app.database().ref('users').child(this.userID).child('Configured');
    var configured;
    db.on('value', function(snapshot) {
       configured = snapshot.val();
    });
    if(configured == false) {
      return true;
    }
    else{
      return false;
    }
  }

  getUserEmail() {
    return this.afd.app.auth().currentUser.email;
  }

  getInterestList() {
    return this.afd.list('/Interests');
  }

  addInterest(id, itemKey) {
    const members = this.afd.app.database().ref(`Interests/${itemKey}/members`)
    members.child(this.userID).set(true);
  }

  removeInterest(id, itemKey) {
    const member = this.afd.app.database().ref(`Interests/${itemKey}/members/${this.userID}`)
    member.remove()
  }

  updateDistance(id, value){
    const distance = this.afd.app.database().ref(`users/${this.userID}/distance/`);
    distance.set(value);
  }

  updateTime(id, value){
    const time = this.afd.app.database().ref(`users/${this.userID}/time/`);
    time.set(value);    
  }
  
    getUserEvents() {
      return this.afd.list('/Events/');
    }
    
    getSpecifiedUserEvents(id) {
      return this.afd.object(`Events/${id}`);
    }

  addEvent(event: UserEvent) {
    var eventRef = this.afd.app.database().ref("Events");
    eventRef.push(event);
  }

  updateEvent(id, event: UserEvent) {
    var eventRef = this.afd.app.database().ref(`Events/${id}`);
    console.log(id)
    eventRef.set(event);
  }

  removeEvent(id) {
    const eventRef = this.afd.app.database().ref(`Events/${id}`);
    eventRef.remove();
  }

}
