import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: '/',
      routerLinkActiveOptions: { exact: true }
    },
    {
      label: 'Counter',
      icon: 'pi pi-calculator',
      routerLink: '/counter'
    },
    {
      label: 'Blog',
      icon: 'pi pi-book',
      routerLink: '/blog'
    }
  ];
}
