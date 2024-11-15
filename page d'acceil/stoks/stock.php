<?php
session_start();
$idphar= $_SESSION['cxn'][0]["pharmacien_id"];
$cherche = null;
require_once '../../database/database.php';
$db = new db();
if (!empty($_SESSION['stock'])) {
    $cherche = $_SESSION['stock'];
}

if (isset($_POST['recherche'])) {

    $query = $_POST['query'];
    $cherche = $_SESSION['stock'] = $db->recherchesimple($query);
}
if(isset($_POST['ajouter'])){
    
   
   $db->ajouterStock($idphar,$_POST['id'],$_POST['quantite']);

}
 ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="simple.css">

</head>

<body>
    <form action="" method="post">
        <input type="text" name="query">
        <input type="submit" value="recherche" name="recherche">
    </form>
    <div>
        <?php

        if ($cherche != null) {


        ?>
            <div align="left">

                <table border="3">
                    <thead>
                        <th>le nom de medicament</th>
                        <th>dosage </th>
                        <th>forme</th>
                        <th>presentation</th>
                        <th>prix</th>
                        <th>avendre</th>

                    </thead>
                    <tbody>

                        <?php foreach ($cherche as $res) { ?>
                            <tr>

                                <td><?php echo $res['specialite'] ?></td>
                                <td><?php echo $res['dosage'] ?></td>
                                <td><?php echo $res['forme'] ?></td>
                                <td><?php echo $res['presentation'] ?></td>
                                <td><?php echo $res['ppv'] ?>dh</td>
                                <th>
                                    <form action="#" method="post">
                                        <input type="hidden" name="id" value="<?php echo $res['id'] ?>">
                                        <input type="numbre" name="quantite"required>
                                        <input type="submit" value="ajouter au stock" name="ajouter">
                                    </form>
                                </th>
                            </tr>


                        <?php } ?>

                    </tbody>
                </table>
            </div>
        <?php } ?>


</body>

</html>