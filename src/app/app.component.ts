import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, map} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'minivns';

  showHeaderAndSidebar: boolean = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      map(route => route.snapshot)
    ).subscribe(snapshot => {
      const url = snapshot.url.map(segment => segment.path).join('/');
      this.showHeaderAndSidebar = !this.shouldHideHeaderAndSidebar(url);
    });
  }

  shouldHideHeaderAndSidebar(url: string): boolean {
    const routesToHide = ['/login', '/error'];
    return routesToHide.some(route => url.includes(route)) || url === '';
  }
}
