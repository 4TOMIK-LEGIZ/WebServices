export class SerchLawyerFactory {
  public static createFrom(SpecializationID: number, Rating: number, Zone: Zone): SerchLawyer {
    return new LawyerFilter(0, SpecializationID, Rating, Zone);
  }

  public static withId(id: number, SpecializationID: number, Rating: number, Zone: Zone): SerchLawyer {
    return new LawyerFilter(id, SpecializationID, Rating, Zone);
  }
}