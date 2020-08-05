import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Adoptable } from 'src/app/models/adoptables';
//socket.io
//
import { Socket } from '@hreimer/ngx-socket-io';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdoptableService {
  private changes = new BehaviorSubject(false);

  constructor(private http: HttpClient, private socket: Socket) {
    /*
      Client will wait for events from socket.io which allows our app to retrieve data from MongoDB in real time.
      All components which import adoptable service should subscribe to getChanges() and use logic based on the returned boolean value.
    */
    this.socket.on('created', response => {
      this.setChanges(true);
      //console.log('created');
    });
    this.socket.on('updated', response => {
      this.setChanges(true);
      //console.log('updated');
    });
    this.socket.on('deleted', response => {
      this.setChanges(true);
      //console.log('deleted');
    });
  }

  getChanges(): Observable<boolean> {
    return this.changes.asObservable();
  }
  setChanges(value: boolean) {
    this.changes.next(value);
  }

  isConnected(): Promise<any> {
    return this.http.get('/api/connection-test', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .toPromise()
      .then(res => res as String)
      .catch(err => {
        return err;
      })
  }

  getAnalytics(): Promise<any> {
    return this.http.get('/api/dogs/analytics', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .toPromise()
      .then(res => res as String)
      .catch(err => {
        return err;
      })
  }

  getDogs(skip: string, limit: string): Promise<any> {
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
    let param1 = age == null ? '*' : age;
    let param2 = gender == null ? '*' : gender;
    let param3 = search == null ? '' : search;
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

  deleteDogByID(id: string): Promise<any> {

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

  setFeaturedDogById(id: string): Promise<any> {

    return this.http.post(`/api/admin/setFeatured/${id}`, {
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

  getDocCount(): Promise<any> {
    return this.http.get('/api/dogs/count', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .toPromise()
      .then(res => res as String,)
      .catch(err => {
        return err;
      })
  }
}
