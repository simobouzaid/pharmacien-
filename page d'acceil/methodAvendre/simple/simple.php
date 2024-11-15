<?php
include('../../../database/database.php');
$db = new db();
session_start();

$cmpt = 1;
$yws = $_SESSION['cxn'];
$id_phar = $yws[0]['pharmacien_id'];

// إعداد المتغيرات
$cherche = null;
$vendre = null;

if (empty($_SESSION['cxn'])) {
    header('location:../../../connexion/cxn.php');
    exit;
}

if (!isset($_SESSION['id'])) {
    $_SESSION['id'] = [];
}

$ids = $_SESSION['id'];

// إضافة المنتج إلى الجلسة
if (isset($_POST['ajouter'])) {
    $id = $_POST['id'];
    $stock = $db->testStock($id_phar, $id);

    if ($stock) {
        $_SESSION['id'][] = $id;
    } else {
        echo 'Votre produit n\'est pas trouvé dans le stock';
    }
}

// حذف المنتج من الجلسة
if (isset($_POST['effacer'])) {
    $delete_id = $_POST['delete_id'];
    if (($key = array_search($delete_id, $_SESSION['id'])) !== false) {
        unset($_SESSION['id'][$key]);
    }
}

// معالجة تأكيد العملية لجميع الأدوية في الجلسة
if (isset($_POST['valider'])) {
    foreach ($_SESSION['id'] as $product_id) {
        $cmpt--;
        $false = $db->ajouterStock($id_phar, $product_id, $cmpt);
        if ($false != null) {
            $db->validerClient($id_phar, $product_id);
        } else {
            echo 'Votre médicament n\'est pas disponible dans le stock';
        }
    }
    unset($_SESSION['id']);
    header('location:../../index.php');
    exit;
}

if (isset($_POST['credits'])) {
    header("location:../client/client.php?id=$id_phar");
    exit;
}

// عرض المنتجات المضافة ومعالجة العمليات
if (isset($ids)) {
    $sum = 0;
    foreach ($ids as $i) {
        $vendre = $db->afficherMedicament($i);

        if ($vendre != null) {
            foreach ($vendre as $v) { ?>
                <ul>
                    <li>Le nom : <?= htmlspecialchars($v['specialite']) ?>,
                        le prix : <?= htmlspecialchars($v['ppv']) ?> dh
                    </li>
                    <form action="" method="post">
                        <input type="hidden" name="delete_id" value="<?= htmlspecialchars($v['id']) ?>">
                        <input type="submit" name="effacer" value="effacer">
                    </form>
                </ul>
                <?php
                $v1 = str_replace(',', '.', $v['ppv']);
                $v2 = floatval($v1);
                $sum += $v2;
            }
        }
    }
    ?>
   
    <li>Le total: <?= number_format($sum, 2) ?> dh</li>
    <form action="" method="post">
        <input type="submit" value="Valider" name="valider">
        <input type="submit" value="Crédits" name="credits">
    </form>
    <?php
}

// البحث عن المنتجات وعرض النتائج
if (isset($_POST['recherche'])) {
    $query = $_POST['query'];
    $_SESSION['cherche'] = $db->recherchesimple($query);
}

if (!empty($_SESSION['cherche'])) {
    $cherche = $_SESSION['cherche'];
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
    <h1>Recherche</h1>
  

    <form action="" method="post">
        <input type="text" name="query">
        <input type="submit" value="Recherche" name="recherche">
    </form>
    <div>
        <?php if ($cherche != null): ?>
            <div align="left">
                <table border="3">
                    <thead>
                        <th>Le nom de médicament</th>
                        <th>Dosage</th>
                        <th>Forme</th>
                        <th>Présentation</th>
                        <th>Prix</th>
                        <th>A vendre</th>
                    </thead>
                    <tbody>
                        <?php foreach ($cherche as $res): ?>
                            <tr>
                                <td><?= htmlspecialchars($res['specialite']) ?></td>
                                <td><?= htmlspecialchars($res['dosage']) ?></td>
                                <td><?= htmlspecialchars($res['forme']) ?></td>
                                <td><?= htmlspecialchars($res['presentation']) ?></td>
                                <td><?= htmlspecialchars($res['ppv']) ?> dh</td>
                                <td>
                                    <form action="" method="post">
                                        <input type="hidden" name="id" value="<?= htmlspecialchars($res['id']) ?>">
                                        <input type="submit" value="Ajouter" name="ajouter">
                                    </form>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>
