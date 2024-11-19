<?php 
session_start();
if(empty($_SESSION['cxn'])){header('location:../connexion/cxn.php');}
$idphar=$_SESSION['cxn'];
require_once '../database/database.php';
$db=new db();
$cmpt=0;

   
   $content= $db->index($idphar[0]['pharmacien_id']);



?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="acceil.css">
    <title>Acceil</title>
</head>
<body>
    <nav class="navbar">
        <a href="stoks/stock.php">ajouter un stock</a>
        <a href="methodAvendre/client/afficherclient.Php">le credit de client</a>
        <a href="stoks/afficherStock.php">le stock</a>
       
        <a href="../connexion/cxn.php">deconnexion</a>
    </nav>

    <div class="container" align="center">
        <form action="" method="post">
            <input type="submit" name="avent" value="Avendre">
            <?php if(isset($_POST['avent'])) { ?>
                <select id="methode" name="cod" style="display:block; margin-top:10px;">
                    <option value="cod_barre">Cod Barre</option>
                    <option value="simple">Simple</option>
                </select>
                <input type="submit" name="ok" value="ajouter method" style="display:block; margin-top:10px;" >
            <?php } ?>
        </form>

        <?php 
        if (isset($_POST['ok'])) {
            if ($_POST['cod'] == 'simple') {
            header( 'location:methodAvendre/simple/simple.php');
            } else {
               // include 'codbarre.php';
            }
        }
        ?>
    </div>
         <?php foreach($content as $c){ 
            
           
             ?>  
         <table border="3">
            <thead>
                <tr>
                    <th>
                        nom medicament:<?=$c['specialite'] ?>
                        </th>
                        <th>
                        prix:<?=$c['ppv'] ?>
                         </th>
                        <th>
                        date de vente:<?=$c['date_vente'] ?>

                    </th>
                </tr>
            </thead>
         </table>
        <?php $cmpt=0; }?>
</body>
</html>
