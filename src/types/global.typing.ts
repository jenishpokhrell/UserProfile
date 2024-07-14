export interface IUsers{
    imageUrl: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    birthDate: string;
    city: string;
    district: string;
    province: string;
    country: string;
}
export interface ICountry {
    name: {
      common: string;
    };
    cca3: string;
  }