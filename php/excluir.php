<?php

//Incluir conexao
include_once("conexao.php");

//Obter dados
$obterDados = file_get_contents("php://input");

//Extrair dados do JSON
$extrair = json_decode($obterDados);

//Separar dados do JSON
$idCurso = $extrair->curso->idCurso;

//SQL
$sql = "DELETE FROM cursos WHERE idCurso=$idCurso;";

$stmt = mysqli_prepare($conexao, $sql);
$stmt->bind_param('d', $idCurso);
$stmt->execute();

//Exportar dados cadastrados
$curso = [
    'idCurso' => $idCurso,
    'nomeCurso' => $nomeCurso,
    'valorCurso' => $valorCurso
];

//JSON
echo json_encode(['curso' => $curso]);

?>