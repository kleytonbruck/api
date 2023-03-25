import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { CursoService } from './curso.service';



@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  //URL Base
  //url = "http://localhost/api/php/";

  //Vetor de cursos
  public vetor: Curso[] = [];

  //Objeto da classe curso
  public curso = new Curso();


  //construtor
  constructor(private curso_servico: CursoService) { }

  //inicializador
  ngOnInit() {
    //Ao iniciar o sistema, devera listar os cursos
    this.selecao();
  }

  //Selecionar
  selecao() {
    this.curso_servico.obterCursos().subscribe(
      (res: Curso[]) => {
        this.vetor = res;
        //console.log(this.vetor);       
      }
    );
  }

  //Cadastrar
  cadastrar() {
    this.curso_servico.cadastrarCurso(this.curso).subscribe(
      (res: Curso[]) => {

        //adicionando dados ao vetor
        //this.vetor = res;

        //limpar atributos
        //this.curso.nomeCurso = null
        //this.curso.valorCurso = null

        //atualizar listagem
        this.selecao();
        this.curso = new Curso();
      }
    )
  }

  //Alterar
  alterar() {
    this.curso_servico.atualizarCurso(this.curso).subscribe(
      (res) => {
        //ataulizar vetor
        this.vetor = res;

        //limpar valores do objeto
        //this.curso.nomeCurso = null;
        //this.curso.valorCurso = null;
        this.selecao();
      }
    )
  }
  /*
    //Remover
    remover() {
      this.curso_servico.removerCurso(this.curso).subscribe(
        (res: Curso[]) => {
          this.vetor = res;
  
          //this.curso.nomeCurso = null;
          //this.curso.valorCurso = null;
          this.selecao();
        }
      )
    }
  */
  remover(curso: Curso) {
    this.curso_servico.removerCurso(curso).subscribe(
      (response: Curso[]) => {
        this.vetor = response;
      }
    );
  }

  //selecionar curso especifico
  selecionarCurso(c: Curso) {
    this.curso.idCurso = c.idCurso;
    this.curso.nomeCurso = c.nomeCurso;
    this.curso.valorCurso = c.valorCurso;
  }

}
