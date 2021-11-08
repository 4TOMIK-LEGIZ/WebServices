
//Factory for ServiceQualificationEntity

export class ServiceQualificationEntity {
    public static createFrom(lawyerid: number, customerid: number, feedback: string, qualification:
         number, qDate: date): ServiceQualification {
            return new ServiceQualification(0, lawyerid, customerid, feedback, qualification, qDate);
    }

    public static withId(id: number, lawyerid: number, customerid: number, feedback: string, qualification:
         number, qDate: date): ServiceQualification {
            return new Customer(id, lawyerid, customerid, feedback, qualification, qDate):
    }
}