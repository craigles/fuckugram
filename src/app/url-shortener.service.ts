import { Injectable } from '@angular/core';
import { Http, Jsonp, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UrlShortenerService {
  key = "AIzaSyAgQiePuGQXbY34lMQuEq9Vp3Ik9fhJAYo";
  constructor(private http: Http) { }

  shorten(url: string) : Observable<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(`https://www.googleapis.com/urlshortener/v1/url?key=${this.key}`, JSON.stringify({longUrl: url}), options)
      .map(res => res.json()["id"])
      .catch(e => url);
  }
}
