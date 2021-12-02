import { Component, OnInit } from '@angular/core';
import {VotingService} from "../../services/voting/voting.service";
import {TokenDecoderService} from "../../services/token-decoder/token-decoder.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
