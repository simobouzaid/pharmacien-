<?php
if (isset($_POST['login'])) {
    $nom = $_POST['nom'];
    $email = $_POST['email'];
    $password = $_POST['pass'];
    if (!empty($nom && $email && $password)) {
        echo $nom . "###" . $email . "###" . $password;

        require_once '../database/database.php';

        $db = new db();
        $db->insert($nom,$email,$password);

    }
}


?>



<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="stylecxn.css">
    <title>inscription</title>
</head>

<body>
    <div class="login">

        <form action="" method="post">
            <input type="text" name="nom" placeholder="le nom complet" required>

            <input type="email" name="email" placeholder="email" required>
            <input type="password" name="pass" placeholder="le mot de pass" required>
            <input type="submit" value="inscripe" name="login">

        </form>
        <a href="cxn.php"> connexion </a>
    </div>

</body>

</html>