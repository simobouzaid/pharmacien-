<?php 
session_start();
include('../../../database/database.php');
$db = new db();
if(empty($_SESSION['cxn'])){header('location:../connexion/cxn.php');}
$idphar=$_SESSION['cxn'][0]["pharmacien_id"];
 if(isset($_POST['valider'])){
   $id_product= $_POST['midicament'];
    $nomclient=$_POST['client'];
    $db->creditVALIDER($id_product,$nomclient,$idphar );
    header("location:afficherclient.Php");
 }