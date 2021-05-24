import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '3juX6Wq1Cds7lopUw28YVXrEh6G4ftkF';
  private servicio_url: string = 'http://api.giphy.com/v1/gifs'
  private _historial: string[] = [];

  // TODO: cambiar any por su tipo correspondiente
  public resultados: Gif [] = [];

  get historial(){
    return [...this._historial];
  }
  
  constructor(private http: HttpClient) {
    
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse( localStorage.getItem('historial')! );
    // }

  }

  buscarGifs( query: string = '' ){

    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes( query ) ){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem( 'historial', JSON.stringify( this._historial ) );
      
    }

    
    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query)

          console.log(params.toString());

    this.http.get<SearchGifsResponse>(`${ this.servicio_url }/search`, { params })
          .subscribe( ( resp ) => {
            this.resultados = resp.data;
            localStorage.setItem( 'resultados', JSON.stringify( this.resultados ) );
            console.log(this.resultados);
          } )

    console.log( this._historial );

  }

  
}
