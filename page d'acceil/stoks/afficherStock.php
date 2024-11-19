<?php
session_start();
$id_phar=$_SESSION['cxn'][0]['pharmacien_id'];
require_once '../../database/database.php';
$db = new db();
$stock=$db->afficheStock($id_phar);
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../acceil.css">
    <title>stock</title>
</head>
<h3 align="center">le stock de medicament </h3>
<body>
    <table border="2" >
        <thead>
        <th>le nom </th>
        <th>dosage</th>
        <th>forme</th>
        <th>en skock</th>

        </thead>
        <?php foreach ($stock as $stocks) {?>
       
            <tbody>
                <tr>
                    <th><?=$stocks["specialite"]?></th>
                    <th><?=$stocks["dosage"]?></th>
                    <th><?=$stocks["forme"]?></th>
                    <th><?=$stocks["quantite_en_stock"]?></th>
                    
                </tr>
                
            </tbody>
            <?php }?>
    </table>
</body>
</html>