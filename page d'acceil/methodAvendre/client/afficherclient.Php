<?php 
session_start();
if(empty($_SESSION['cxn'])){header('location:../connexion/cxn.php');}
$idphar=$_SESSION['cxn'][0]["pharmacien_id"];

include('../../../database/database.php');
$db = new db();
 $client=$db->affichercredit($idphar);

 ?>


 <!DOCTYPE html>
 <html lang="en">
 <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>les credits</title>
 </head>
 <body>
 <nav class="navbar">
        <a href="../../index.php">page d'acceille</a>
       
       
    </nav>
    <table border="2">
        <thead>
            <th>nom de client</th>
            <th>specialite ou medicament</th>
            <th>dosage</th>
            <th>forme</th>
            <th>prix</th>
            <th>date_credit</th>
            <th>procedure</th>
        </thead>
        <tbody>
            <?php foreach($client as $clients): ?>

            <tr>
                <td><?=$clients["nomclient"] ?></td>
                <td><?=$clients["specialite"] ?></td>
                <td><?=$clients["dosage"] ?></td>
                <td><?=$clients["forme"] ?></td>
                <td><?=$clients["ppv"] ?>dh</td>
                <td><?=$clients["date_credit"] ?></td>
                <td><form action="valider_credit_client.php" method="post">
                    <input type="hidden" name="midicament" value="<?=$clients["id"]?>">
                    <input type="hidden" name="client" value="<?=$clients["nomclient"]?>">
                    <input type="submit" value="valider credit" name="valider">
                    
                </form>
                    <?php ?></td>
            </tr>
            <?php endforeach;?>
        </tbody>
    </table>
    
 </body>
 </html>
 