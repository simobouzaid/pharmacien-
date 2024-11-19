

<?php
include('../../../database/database.php');
session_start();

if (empty($_SESSION['cxn'])) {
    header('location:../../../connexion/cxn.php');
    exit;
}

$db = new db();

$yws = $_SESSION['cxn'];
$id_phar = $yws[0]['pharmacien_id'];

if (isset($_POST['ajouter'])) {
    $id = $_POST['id'];
    $stock = $db->testStock($id_phar, $id);

    if ($stock) {
        $_SESSION['id'][] = $id;
        header('Location: simple.php');
        exit;
    } else {
        echo 'Votre produit n\'est pas trouvé dans le stock';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <a href="simple.php"> retoure </a>
</body>
</html>
