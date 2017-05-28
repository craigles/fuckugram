import { Component, OnInit } from '@angular/core';
import { Http, Jsonp, Response, RequestOptions, Headers } from '@angular/http';
import { InsultService } from '../insult.service';
import { InsulterDescriptionsService } from '../insulter-descriptions.service';
import { OperationResolver } from '../operation-resolver';
import { UrlShortenerService } from '../url-shortener.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Clipboard } from 'ts-clipboard';

@Component({
  selector: 'insult-form',
  templateUrl: './insult-form.component.html',
  styleUrls: ['./insult-form.component.css'],
  providers: [InsultService, InsulterDescriptionsService, UrlShortenerService, OperationResolver]
})
export class InsultFormComponent implements OnInit {
  insultMessage = "";
  insultSubtitle = "";
  selectedOperation: any;
  insultUrl = "";
  insultee = "";
  fields: string[] = [];
  operations = [];
  insulterDescriptions = [];
  insulterDescription = "";

  constructor(
    private insultService: InsultService,
    private insulterDescriptionsService: InsulterDescriptionsService,
    private urlShortenerService: UrlShortenerService,
    private router: Router,
    private route: ActivatedRoute,
    private http: Http
    ) {
    }

  insult() {
    this.insultService.insult(this.selectedOperation, this.fields)
      .subscribe(data => {
        this.insultMessage = data["message"];
        this.insultSubtitle = data["subtitle"];
        let operationUrl = this.insultService.getOperationUrl(this.selectedOperation, this.fields);
        let encodedOperationUrl = window.btoa(operationUrl);
        this.urlShortenerService.shorten(`${window.location.href}${encodedOperationUrl}`)
          .subscribe(url => {
            this.insultUrl = url;
          });

        this.speak(this.insultMessage);
        this.insulterDescription = this.insulterDescriptionsService.randomDescription();

        let nameIndex = this.selectedOperation["fields"].findIndex(f => f["field"] == "name");
        this.insultee = this.fields[nameIndex];
      },
      error => {
        this.insultMessage = error.message;
        this.insultSubtitle = error.subtitle;
        this.speak(this.insultMessage);
      });
  }

  speak(message: any) {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(message));
  }

  copyToClipboard() {
    Clipboard.copy(this.insultUrl);
  }

  ngOnInit() {
    this.operations = this.route.snapshot.data["operations"].filter(o => o["fields"].find(f => f["field"] == "from"));
    
  }

  
 
  fieldsAreValid() {
    let selectedFieldsLength = this.selectedOperation["fields"].length;

    return this.fields.length >= selectedFieldsLength && 
           this.fields.filter(f => f.trim() == "").length == 0;
  }
}