import { Routes } from '@angular/router';
import {VaultComponent} from './pages/vault/vault.component';
import {LoginComponent} from './pages/login/login.component';

export const routes: Routes = [
  { path: '', component: VaultComponent },
  { path: 'login', component: LoginComponent },



];
