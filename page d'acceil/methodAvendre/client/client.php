<?php

session_start();
$medi=null;
if(!isset($_SESSION["id"])){
    echo "ajouter une medicament   ";
}
if (empty($_SESSION['cxn'])) {
    header('location:../../../connexion/cxn.php');
    exit;
}

include('../../../database/database.php');
$db = new db();

if (isset($_GET['id'])) {
     $id=$_GET['id'];
    $id_medicament = $_SESSION['id'];
   
    }




?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../acceil.css">
    <title>credit client</title>
</head>

<body>
    <h1 align="center">ajouter un credits </h1>
    <?php $sum = 0;
     foreach ($id_medicament as $im) {


        $medi = $db->afficherMedicament($im);
    if(!empty($medi)){   
    foreach ($medi as $medicaments) {
        $medical = str_replace(',', '.', $medicaments['ppv']);

        $sum += floatval($medical);   ?>
        <div align="center">
            <div>
                name de medicament : <?= $medicaments['specialite'] ?><br>
                le prix: <?= $medicaments['ppv'] ?> dh
            </div>



        </div>


    <?php }} }?>
    <p align="center"> le total : <?= $sum ?> dh</p>
    <form action="credit.php" method="post" align="center">
        <input type="hidden" name="id" value="<?= $id ?>" >
        <input type="text" name="nom" placeholder="le nom complet de client"required>
        <input type="submit" value="credit" name="credit">

    </form>

</body>

</html>
<?php
if(empty($sum)){
        header("location:../simple/simple.php?credit=$cr");

}