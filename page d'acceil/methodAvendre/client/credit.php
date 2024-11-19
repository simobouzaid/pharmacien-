<?php
$id_medicament = null;
session_start();

$id_medicament = $_SESSION['id'];





if (isset($_POST['credit'])) {
    include('../../../database/database.php');
    $db = new db();
    $nom = $_POST['nom'];
    $id = $_POST['id'];
    $valider=false;
    $date= new DateTime();
    $date_credit= $date->format('y-m-d');
    
    if($id_medicament!= null ){
        $cmpt=0;
    foreach ($id_medicament as $id_medicamentS) {
        $cmpt--;
        $db->vendeMedicament($id,$id_medicamentS,$cmpt);

        $db->ajoutercredit($nom,$id,$id_medicamentS,$date_credit,$valider);
    $cmpt=0;
}
    header('location:../../index.php');
}else{
    echo "ajouter une medicament ";
    

}
}
