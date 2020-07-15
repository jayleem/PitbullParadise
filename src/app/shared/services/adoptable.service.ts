import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Adoptable } from 'src/app/models/adoptables';

@Injectable({
  providedIn: 'root'
})
export class AdoptableService {

  constructor(private http: HttpClient) { }

  getDogs(skip:string, limit:string): Promise<any> {
    let param1 = skip;
    let param2 = limit;
    let params = new HttpParams().set("skip", param1).set("limit", param2); 
    return this.http.get('/api/dogs', {
      headers: {
        'Content-Type': 'application/json',
      },
      params: params
    })
      .toPromise()
      .then(res => res as Adoptable)
      .catch(err => {
        return err;
      })
  }

  getDogsById(id): Promise<any> {
    return this.http.get('/api/dogs/id/' + id, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .toPromise()
      .then(res => res as Adoptable)
      .catch(err => {
        console.log(err);
      })
  }

  getFeaturedDogs(): Promise<any> {
    return this.http.get('/api/dogs/featured', {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .toPromise()
      .then(res => res as Adoptable)
      .catch(err => {
        return err;
      })
  }

  getDogsQuery(age: string, gender: string, search: string): Promise<any> {
    //create new http params
    //
    let param1 = age == null ? '*': age;
    let param2 = gender == null ? '*': gender;
    let param3 = search == null ? '': search;
    let params = new HttpParams().set("age", param1).set("gender", param2).set("search", param3); 

    return this.http.get(`/api/dogs/query/`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: params
    })
      .toPromise()
      .then(res => res as Adoptable)
      .catch(err => {
        return err;
      })
  }

  createDog(data): Promise<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams().set("data", JSON.stringify(data))
    }

    return this.http.post<Adoptable>(`/api/admin/new`, data, options)
      .toPromise()
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      })   
  }

  updateDogByID(data): Promise<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams().set("data", JSON.stringify(data))
    }

    return this.http.post<Adoptable>(`/api/admin/update`, data, options)
      .toPromise()
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      })
  }

  deleteDogByID(id:string ): Promise<any> {

    return this.http.delete(`/api/admin/delete/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .toPromise()
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      })
  }

  purgeDB(): Promise<any> {

    return this.http.delete(`/api/admin/delete`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .toPromise()
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      })
  }

  testDataDB(): Promise<any> {

    return this.http.post(`/api/admin/test/25`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .toPromise()
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      })
  }
  
}
