<?php

//Incluir conexao
include_once("conexao.php");

//Obter dados
$obterDados = file_get_contents("php://input");

//Extrair dados do JSON
$extrair = json_decode($obterDados);

//Separar dados do JSON
$idCurso = $extrair->cursos->idCurso;
$nomeCurso = $extrair->cursos->nomeCurso;
$valorCurso = $extrair->cursos->valorCurso;

//SQL
$sql = "UPDATE cursos SET nomeCurso='$nomeCurso', valorCurso='$valorCurso' WHERE idCurso='$idCurso'";
mysqli_query($conexao, $sql);

//Exportar dados cadastrados
$curso = [
    'idCurso' => $idCurso,
    'nomeCurso' => $nomeCurso,
    'valorCurso' => $valorCurso
];

//JSON
echo json_encode(['curso' => $curso]);


?>