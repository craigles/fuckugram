import { Component, OnInit } from '@angular/core';
import { InsultService } from '../insult.service';
import { OperationResolver } from '../operation-resolver';
import { UrlShortenerService } from '../url-shortener.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Clipboard } from 'ts-clipboard';

@Component({
  selector: 'insult-form',
  templateUrl: './insult-form.component.html',
  styleUrls: ['./insult-form.component.css'],
  providers: [InsultService, UrlShortenerService, OperationResolver]
})
export class InsultFormComponent implements OnInit {
  insultMessage = "";
  insultSubtitle = "";
  selectedOperation: any;
  insultUrl = "";
  insultee = "";
  fields: string[] = [];
  operations = [];

  constructor(
    private insultService: InsultService,
    private urlShortenerService: UrlShortenerService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  insult() {
    this.insultService.insult(this.selectedOperation, this.fields)
      .subscribe(data => {
        this.insultMessage = data["message"];
        this.insultSubtitle = data["subtitle"];
        let operationUrl = this.insultService.getOperationUrl(this.selectedOperation, this.fields);
        let encodedOperationUrl = window.btoa(operationUrl);
        this.urlShortenerService.shorten(`${window.location.href}/${encodedOperationUrl}`)
          .subscribe(url => {
            this.insultUrl = url;
          });

        window.speechSynthesis.speak(new SpeechSynthesisUtterance(this.insultMessage));

        let nameIndex = this.selectedOperation["fields"].findIndex(f => f["field"] == "name");
        this.insultee = this.fields[nameIndex];
      },
      error => this.insultMessage = <any>error);
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