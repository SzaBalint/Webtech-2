import { Component } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {

  headers = ["Name","Time","Difficulty","Mistakes"];

  rows = [
    {
      "Name" : "Béla",
      "Time" : "1:02:42",
      "Difficulty" : "Hard",
      "Mistakes" : "0"
    },

    {
      "Name" : "Tom",
      "Time" : "1:02:35",
      "Difficulty" : "Hard",
      "Mistakes" : "0"
    },

    {
      "Name" : "Bob",
      "Time" : "1:32:88",
      "Difficulty" : "Easy",
      "Mistakes" : "2"
    },
    {
      "Name" : "Gida",
      "Time" : "2:00:02",
      "Difficulty" : "Hard",
      "Mistakes" : "0"
    }
  ]
}
