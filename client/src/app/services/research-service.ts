import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Research} from "../shared/model/Research";
import {Observable} from "rxjs";

@Injectable({
  providedIn:'root'
})
export class ResearchService {
  constructor(private http: HttpClient) {
  }

  getAllResearch(): Observable<Research[]>{
    return this.http.get<Research[]>('/api/research')
  }
}
