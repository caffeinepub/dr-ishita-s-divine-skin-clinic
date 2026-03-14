import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Appointment {
    serviceType: string;
    preferredDate: string;
    patientName: string;
    phoneNumber: string;
}
export interface backendInterface {
    getAllAppointments(): Promise<Array<Appointment>>;
    submitAppointment(patientName: string, phoneNumber: string, serviceType: string, preferredDate: string): Promise<void>;
}
