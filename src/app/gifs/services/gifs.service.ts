import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {

    private _tagHistory: string[] = [];
    private apiKey: string = 'l3td3q5t5dqLIW90Tl0pHBSdxXbtb9I0';

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


    this.http.get('https//api.giphy.com/v1/gifs/search?api_key=l3td3q5t5dqLIW90Tl0pHBSdxXbtb9I0&q=DBZ&limit=10')
           .subscribe( resp =>{

                console.log(resp);
           })
    }
}