import { ModuleCell } from './module-cell';

export interface BatteryModule {
    moduleId: number;
    cells: ModuleCell[];
    temperature: number;
}