import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  public user_id: number | undefined;
  constructor( private activatedRoute: ActivatedRoute, private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
    this.user_id = this.tokenStorage.getId();
  }
}
