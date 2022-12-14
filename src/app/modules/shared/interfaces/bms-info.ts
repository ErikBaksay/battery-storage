import { BatteryModule } from './battery-module';

export interface BmsInfo {
    modules: BatteryModule[];
    // Status of charge
    soc: number;
    // Battery current
    batteryCurrent: number;
    // Battery voltage (all battery cells)
    batteryVoltage: number;
    // Measured cells delta
    batteryDelta: number;
    // Contactor state (between battery and hybrid inverter)
    contactorState: boolean;
}