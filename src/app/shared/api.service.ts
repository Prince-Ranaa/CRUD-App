import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postEmployee(data: any) {
    return this.http.post("http://localhost:3000/posts", data)
  }

  getEmployee() {
    return this.http.get("http://localhost:3000/posts")
  }


  delete(id: number) {
    return this.http.delete("http://localhost:3000/posts/" + id)
  }

  update(data: any, id: number) {
    return this.http.put("http://localhost:3000/posts/" + id, data)
  }
}
