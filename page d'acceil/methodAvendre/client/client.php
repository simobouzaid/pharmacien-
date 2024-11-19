<?php

session_start();
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
    foreach ($id_medicament as $im) {


        $medi = $db->afficherMedicament($im);
    }
}


var_dump($medi);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>credit client</title>
</head>

<body>
    <h1>ajouter un credits </h1>
    <?php $sum = 0;
    if(!empty($medi)){   
    foreach ($medi as $medicaments) {
        $medical = str_replace(',', '.', $medicaments['ppv']);

        $sum += floatval($medical);   ?>
        <div>
            <div>
                name de medicament : <?= $medicaments['specialite'] ?>
                le prix: <?= $medicaments['ppv'] ?> dh
            </div>



        </div>


    <?php }} ?>
    <p> le total : <?= $sum ?> dh</p>
    <form action="credit.php" method="post">
        <input type="hidden" name="id" value="<?= $id ?>" required>
        <input type="text" name="nom">
        <input type="submit" value="credit" name="credit">

    </form>

</body>

</html>
<?php
if(empty($sum)){
        header("location:../simple/simple.php?credit=$cr");

}