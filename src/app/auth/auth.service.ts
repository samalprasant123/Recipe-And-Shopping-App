import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

    token: string;

    constructor(private router: Router) {}

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
                response => {
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (tokenFromFB) => this.token = tokenFromFB
                        );
                    this.router.navigate(['/']);
                }
            )
            .catch(
                error => console.log(error)
            );
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (tokenFromFB) => this.token = tokenFromFB
                        );
                    this.router.navigate(['/']);
                }
            )
            .catch(
                error => console.log(error)
            );
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
        this.router.navigate(['/signin']);
    }

    loadUser() {
        firebase.auth().onAuthStateChanged(
            (currentUser) => {
                console.log('Current User = ', currentUser);
                if (currentUser === null) {
                    this.token = null;
                } else {
                    currentUser.getIdToken()
                        .then(
                            (token: string) => this.token = token
                        );
                }
            }
        );
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then(
                (tokenFromFB) => this.token = tokenFromFB
            );
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }
}
