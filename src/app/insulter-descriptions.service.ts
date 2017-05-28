import { Injectable } from '@angular/core';
import { Http, Jsonp, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class InsulterDescriptionsService {
  private insulterDescriptions = [];
  constructor(
    private http: Http
  ) {
    this.InsulterDescriptions().subscribe((r: any) => this.insulterDescriptions = r);
  }

  randomDescription() {
    return this.insulterDescriptions[this.randomBetween(0, this.insulterDescriptions.length)];
  }

  private InsulterDescriptions() {
    return this.http.get("/assets/insulterDescriptions.json")
      .map(r => r.json());
  }

  private randomBetween(from: number, to: number) {
    return Math.floor(Math.random() * to) + from;
  }
}