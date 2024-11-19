<?php
session_start();


if (isset($_POST['effacer'])) {
    $delete_id = $_POST['delete_id'];
    if (($key = array_search($delete_id, $_SESSION['id'])) !== false) {
        unset($_SESSION['id'][$key]);
        header("location:simple.php");
    }
}