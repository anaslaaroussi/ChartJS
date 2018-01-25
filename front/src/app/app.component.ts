import { Component,AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Chart from 'chart.js'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

dailyResults : any = [];
hourlyResults : any = [];
labels : any = [];
data : any = [];
show : boolean = true ;
labelsHourly : any = [];
dataHourly : any = [];
dataHourlySelected : any = [];
labelsHourlySelected : any = [];
canvas: any;
ctx: any;
canvas2:any;
ctx2:any;
  constructor(private http: HttpClient) {
    this.http.get('http://localhost:8081/daily').subscribe(data => {
      this.dailyResults.push(data)
    });
    this.http.get('http://localhost:8081/hourly').subscribe(data => {
      this.hourlyResults.push(data)
    });

  }




  showBarDaily() {
console.log(this.labels)
    this.canvas = document.getElementById('myDailyChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Daily Data',
          data: this.data,
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        events: ['click'],
        responsive: false,
        display:true,

        'onClick' :(evt, item) => {
          console.log ('legend onClick', evt);
          console.log('legd item', item);
          try {
            this.dataHourlySelected = [];
            this.getDatabyDate(item[0]._view.label)
            this.showBarHourly();
            this.show = true;

          }
          catch(e){alert("Ressayer")}



        }

      }
    });

  }

  showBarHourly(){
    var timeArray = [];
    var dataArray = [];
    this.show = true;

    console.log(this.dataHourlySelected)
    for(let i = 0 ;i< this.dataHourlySelected.length;i++){
      var spliter = this.dataHourlySelected[i].Time.split(" ")
      var time = spliter[1];
      timeArray.push(time)
      dataArray.push(this.dataHourlySelected[i].TEST);


    }
    // this.getDatabyDate(date);
    this.canvas2 = document.getElementById('myHourlyChart');
    this.ctx2 = this.canvas2.getContext('2d');
    let myChart = new Chart(this.ctx2, {
      type: 'line',
      data: {
        labels: timeArray,
        datasets: [{
          label: 'HourlyData',
          data: dataArray,
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1,
          fill: false,
        }]
      },
      options: {
        events: [],
        ticks: {
          autoSkip: false
        },
        responsive: false,
        display:true,
        'onClick' :(evt, item) => {console.log(item);}

      }
    });

  }




  getData(){
    this.data = [];
    this.labels = [];
    console.log(this.data)
    for(let i = 0 ;i< this.dailyResults[0].length;i++){
      this.labels.push(this.dailyResults[0][i].Date)
      this.data.push(this.dailyResults[0][i].TEST)
    }





    }


  getDatabyDate(date:any) {
    this.dataHourlySelected = [];
    this.labelsHourly = [];
    console.log(this.hourlyResults[0])
    for(let i = 0 ;i< this.hourlyResults[0].length;i++){
      this.labelsHourly.push(this.hourlyResults[0][i].Time)
      this.dataHourly.push(this.hourlyResults[0][i].TEST)

    }
    for (let i = 0 ; i< this.labelsHourly.length;i++){

      let spliter = this.labelsHourly[i].split(" ")[0];
      if(date == spliter) {
        this.dataHourlySelected.push(this.hourlyResults[0][i]);
      }



    }


    console.log(this.dataHourlySelected)





  }


  hideDailyBar(){

    this.show = false;
  }

}


