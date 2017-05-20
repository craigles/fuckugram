import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { InsultService } from '../insult.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-root',
  templateUrl: './insult-card.component.html',
  styleUrls: ['./insult-card.component.css'],
  providers: [InsultService]
})
export class InsultCardComponent implements OnInit {
  insultMessage = "";
  insultSubtitle = "";
  isSpeaking = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private insultService: InsultService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
       this.displayInsult(params['operationUrl']);
    });
  }

  readInsult() {
    let utterance = new SpeechSynthesisUtterance(this.insultMessage);
    let t = this;
    utterance.onstart = function(e) {
      t.isSpeaking = true;
    };
    utterance.onend = function(e) {
      t.isSpeaking = false;
    }
    window.speechSynthesis.speak(utterance);
  }

  displayInsult(operationUrl) {
    this.insultService.insultWithOperationUrl(operationUrl)
      .subscribe(data => {
        this.insultMessage = data["message"];
        this.insultSubtitle = data["subtitle"];
        this.readInsult();
      },
      error => this.insultMessage = <any>error);
  }
}
