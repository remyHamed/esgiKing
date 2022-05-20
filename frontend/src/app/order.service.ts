import { Injectable } from '@angular/core';
import {WebRequestService} from "./web-request.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private webRequestService: WebRequestService
  ) { }

  startTracking() {
    return this.webRequestService.get('user/track')
  }
}
