import { Injectable } from '@angular/core';
import { Http, Jsonp, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

// http://foaas.com
@Injectable()
export class InsultService {
  baseurl = 'http://foaas.com'
  constructor(private http: Http) { }

  insult(operation: Object, fields: any[]): Observable<any> {
    let operationUrl = this.getOperationUrl(operation, fields);
    
    return this.insultWithOperationUrl(operationUrl);
  }

  insultWithOperationUrl(operationUrl: string) : Observable<any> {
    let headers = new Headers({'Accept': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.get(`${this.baseurl}${operationUrl}`, options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  
  getOperationUrl(operation: Object, fields: any[]): string {
    let operationUrl = operation["url"];

    for (var i = 0; i < operation["fields"].length; i++) {
      operationUrl = operationUrl.replace(`:${operation["fields"][i]["field"]}`, fields[i]);
    }

    return operationUrl;
  }

  // http://foaas.com/operations
  operations(): Observable<any> {
    return this.http.get(`${this.baseurl}/operations`)
      .map(res => res.json())
      .catch(this.handleError);
  }
  
  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server   error';
    return Observable.throw(errMsg);
  }
}
