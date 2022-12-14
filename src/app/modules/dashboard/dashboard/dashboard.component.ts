import { BatteryModule } from './../../shared/interfaces/battery-module';
import { BmsInfo } from './../../shared/interfaces/bms-info';
import { DataService } from './../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { takeUntil, Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  tempNumberOfCells : number[] = [0,0,0,0,0,0] 
  tempNumberOfModules : number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  data$ = Observable<BmsInfo>;
  data : BmsInfo | null = null;
  destroyed$ = new Subject();

  constructor(private dataService : DataService) { }

  ngOnInit(): void {
    this.dataService.refreshMockData().subscribe();
    //this.dataService.getData().pipe(takeUntil(this.destroyed$)).subscribe((data)=>this.data$ = (data))
    this.dataService.data$.pipe(takeUntil(this.destroyed$)).subscribe((data)=> this.data = data)

    console.log(this.data);
    
  }

  calculatePercentage(min:number,max:number,current:number){
    return `${(current-min)/(max-min)*100}%`
  }

  calculateModuleVoltage(module:BatteryModule){
    let totalVoltage = 0;
    module.cells.forEach((cell)=>{
      totalVoltage += cell.voltage;
    })
    return totalVoltage.toFixed(2);
  }

  calculateVoltageDifference(module:BatteryModule){
    let minVoltage = module.cells[0].voltage;
    let maxVoltage = module.cells[0].voltage;
    module.cells.forEach((cell)=>{
      if (cell.voltage < minVoltage){
        minVoltage = cell.voltage;
      }
      else if (cell.voltage > maxVoltage){
        maxVoltage = cell.voltage;
      }
    })
    return ((maxVoltage - minVoltage)*1000).toFixed(1);
  }

  calculateBatteryPower(voltage:number, current:number){
    return (voltage*current/1000).toFixed(3);
  }

  ngOnDestroy(){
    this.destroyed$.next('');
    this.destroyed$.complete();
  }

}
