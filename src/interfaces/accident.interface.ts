import {ThirdPartyInterface} from "./third-party.interface";

export interface AccidentInterface {
  id: string;
  license_plate: string;
  third_parties: ThirdPartyInterface[];
}
