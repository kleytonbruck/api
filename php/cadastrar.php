<?php

//Incluir conexao
include_once("conexao.php");

//Obter dados
$obterDados = file_get_contents("php://input");

//Extrair dados do JSON
$extrair = json_decode($obterDados);

//Separar dados do JSON
$nomeCurso = $extrair->cursos->nomeCurso;
$valorCurso = $extrair->cursos->valorCurso;

//SQL
$sql = "INSERT INTO cursos (nomeCurso, valorCurso) VALUES (?, ?)";
//mysqli_query($conexao, $sql);

$stmt = mysqli_prepare($conexao, $sql);
$stmt->bind_param('sd', $nomeCurso, $valorCurso);
$stmt->execute();

//Exportar dados cadastrados
$curso = [
    'nomeCurso' => $nomeCurso,
    'valorCurso' => $valorCurso
];

//JSON
echo json_encode(['cursos' => $curso]);

?>