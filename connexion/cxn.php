<?php
if (isset($_POST['cxn'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    if (!empty($email && $password)) {
        require_once '../database/database.php';
        $db = new db();
        $result=$db->verifier($email,$password);
         if(!empty($result)){
            session_start();
            $_SESSION['cxn']=$result;
            
            header("location:../page d'acceil/index.php");


         }else{
            echo "<h2>error</h2> ";

         }
       



    }
}


?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="stylecxn.css">
    <title>connexion</title>
</head>

<body>
    <div class="login">

        <form action="" method="post">
            <input type="text" placeholder="email" name="email" required>
            <input type="text" placeholder="le mots de pass" name="password" required>
            <input type="submit" value="connexion" name="cxn">
        </form>
        <a href="inscription.php"> inscription</a>
    </div>

</body>

</html>