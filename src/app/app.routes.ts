import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Project } from './components/project/project';
import { Pathfinder } from './components/pathfinder/pathfinder';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'about',
    component: About
  },
  {
    path: 'project',
    component: Project
  },
  {
    path: 'project/pathfinder',
    component: Pathfinder
  },
  
];
