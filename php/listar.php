<?php 

//Incluir conexao
include_once("conexao.php");

//sql
$sql = "SELECT * FROM cursos";

//Executar
$executar = mysqli_query($conexao, $sql);

//Vetor
$cursos = [];


//Indice
$indice = 0;

//Laço

while($linha = mysqli_fetch_assoc($executar)){
    $cursos[$indice]['idCurso'] = $linha['idCurso'];
    $cursos[$indice]['nomeCurso'] = $linha['nomeCurso'];
    $cursos[$indice]['valorCurso'] = $linha['valorCurso'];

    $indice++;
}

//JSON
echo json_encode(['cursos' => $cursos]);

//var_dump($cursos);



?>