import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

const hewader={
  headers:new HttpHeaders({
  'Accept':'application/JSON',
  'Content-Type':'application/JSON',
  Authorization:'Bearer 6bb303856df5ae9b71fc733671d5e27d9d6784c1df0df08ffc465f093a6efceb'
})
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  postUser(data :any){
    return this.http.post<any>("http://gorest.co.in/public/v2/users",data,hewader)
    .pipe(map((res=>{
      return res
    })))
  }
  getEmployee(){
    return this.http.get<any>("http://gorest.co.in/public/v2/users",hewader)
    .pipe(map((res:any)=>{
      return res
    }))
  }
  deleteEmployee(id:number){
    return this.http.delete<any>("http://gorest.co.in/public/v2/users/"+id,hewader)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateEmployee(data:any, id:number){
    return this.http.put<any>("http://gorest.co.in/public/v2/users/" +id ,data,hewader)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
