<?php
session_start();
$id_medicament = $_SESSION['id'];
if (isset($_POST['credit'])) {
    include('../../../database/database.php');
    $db = new db();
    $nom = $_POST['nom'];
    $id = $_POST['id'];
    $valider=false;
    foreach ($id_medicament as $id_medicamentS) {

        $db->ajoutercredit($nom,$id,$id_medicamentS,$valider);
        header('location:../../index.php');
    }
}
