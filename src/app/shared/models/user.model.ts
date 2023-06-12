export class User {
  _id?: string = "";
    name?: Name = new Name();
    cellPhone?: string =""; 
    email: string = '';
    password: string | null ="";  
    createdAt?: Date | number ;
    updatedAt?: Date | number;
    role?: string = "";
    token?: string ="";

}


export class Name {
  first: string = "";
  middle?: string =  "";
  last?: string =  "";
}