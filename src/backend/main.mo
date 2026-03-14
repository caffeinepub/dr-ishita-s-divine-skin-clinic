import List "mo:core/List";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  type Appointment = {
    patientName : Text;
    phoneNumber : Text;
    serviceType : Text;
    preferredDate : Text;
  };

  module Appointment {
    public func compare(appointment1 : Appointment, appointment2 : Appointment) : Order.Order {
      appointment1.patientName.compare(appointment2.patientName);
    };
  };

  let appointments = List.empty<Appointment>();

  let admin : Principal = Principal.fromText("2vxsx-fae");

  public shared ({ caller }) func submitAppointment(patientName : Text, phoneNumber : Text, serviceType : Text, preferredDate : Text) : async () {
    let appointment : Appointment = {
      patientName;
      phoneNumber;
      serviceType;
      preferredDate;
    };
    appointments.add(appointment);
  };

  public query ({ caller }) func getAllAppointments() : async [Appointment] {
    if (caller != admin) {
      Runtime.trap("Only admin can access all appointments");
    };
    appointments.toArray().sort();
  };
};
