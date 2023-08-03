import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {

    private _tagHistory: string[] = [];
    private apiKey: string = 'l3td3q5t5dqLIW90Tl0pHBSdxXbtb9I0';
    private serviceUrl :string = 'https://api.giphy.com/v1/gifs';

    constructor(private http: HttpClient) { }
    
    get tagsHistory(){
        return [...this._tagHistory]
    }

    private organizeHistory(tag: string){
        tag = tag.toLowerCase();

        if(this._tagHistory.includes( tag ) ){
            this._tagHistory = this._tagHistory.filter( (oldTag) => oldTag !== tag)
        }
        
        this._tagHistory.unshift( tag );
        this._tagHistory = this.tagsHistory.splice(0,10);
    }

    async searchTag(tag :string):Promise<void>{

        if(tag.length === 0) return;
        this.organizeHistory(tag);
        const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit','10')
        .set('q',tag)
            this.http.get(`${ this.serviceUrl }/search`,{ params })
           .subscribe( resp =>{

                console.log(resp);
           })
    }
}