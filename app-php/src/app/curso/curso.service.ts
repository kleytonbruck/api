import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  //URL Base
  private url = "http://localhost/api/php/";

  //Vetor
  private vetor: Curso[] = [];
  

  constructor(
    private http:HttpClient
  ) { 
    //JSON.parse
  }

  //Obter todos os cursos
  obterCursos(): Observable<Curso[]>{
    return this.http.get(this.url + "listar")
    .pipe(map((res:any) => {
        //console.log(res);
        this.vetor = res['cursos'];             
        return this.vetor;              
      })
    );
  }

  //Cadastrar curso
  cadastrarCurso(c:Curso): Observable<Curso[]>{
    return this.http.post(this.url + "cadastrar", {cursos:c})
    .pipe(map((res:any) => {      
      this.vetor.push(res['cursos']);
      return this.vetor;
    }));
  }
  
  //remover curso
  removerCurso(c: Curso): Observable<Curso[]>{
    
    const params = new HttpParams().set("idCurso", c.idCurso!.toString());

    return this.http.delete(this.url + "excluir", {params: params})
    .pipe(map((res) => {

      const filtro = this.vetor.filter((curso) => {
        return +curso['idCurso']! !== +c.idCurso!;
      });
        return this.vetor = filtro;
    }))

  }

  //atualizar curso
  atualizarCurso(c:Curso): Observable<Curso[]>{
    //executa a alteracao via url
    return this.http.put(this.url + "alterar", {cursos: c})
    //percorre o vetor pra saber qual o id do curso alterado
    .pipe(map((res) => {
      const cursoAlterado = this.vetor.find((item)=>{
        return +item['idCurso']! === +['idCurso'];
      })
      //altera o valor do vetor local
      if (cursoAlterado){
        cursoAlterado['nomeCurso'] = c['nomeCurso'];
        cursoAlterado['valorCurso'] = c['valorCurso'];
      }
      return this.vetor;
    }))
  }

}



