import { Component, OnInit } from '@angular/core';
import { InsultService } from '../insult.service';
import { UrlShortenerService } from '../url-shortener.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'insult-form',
  templateUrl: './insult-form.component.html',
  styleUrls: ['./insult-form.component.css'],
  providers: [InsultService, UrlShortenerService]
})
export class InsultFormComponent implements OnInit {
  insultMessage = "";
  insultSubtitle = "";
  selectedOperation = "";
  insultUrl = "";
  fields: string[] = [];
  operations = [];

  constructor(
    private insultService: InsultService,
    private urlShortenerService: UrlShortenerService,
    private router: Router,
    ) { }

  insult() {
    this.insultService.insult(this.selectedOperation, this.fields)
      .subscribe(data => {
        this.insultMessage = data["message"];
        this.insultSubtitle = data["subtitle"];
        let operationUrl = this.insultService.getOperationUrl(this.selectedOperation, this.fields);
        
        this.urlShortenerService.shorten(`${window.location.origin}/card?operationUrl=${operationUrl}`)
          .subscribe(url => {
            this.insultUrl = url;
          });

        window.speechSynthesis.speak(new SpeechSynthesisUtterance(this.insultMessage));
      },
      error => this.insultMessage = <any>error);
  }

  copyToClipboard() {

  }

  ngOnInit() {
    this.getAllOperations();
  }

  getAllOperations() {
    this.insultService.operations()
      .subscribe(data => this.operations = data);
  }
}