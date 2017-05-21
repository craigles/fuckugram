import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable, Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { InsultService } from './insult.service';

@Injectable()
export class OperationResolver implements Resolve<any> {
  constructor(private insultService: InsultService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any> {
    return this.insultService.operations();
  }
}