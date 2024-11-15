<?php

class db
{
    private $pdo;
    /*connexion database avec methode pdo */
    public function __construct()
    {
        $host = 'localhost';
        $db = 'pharmacy';
        $user = 'root';
        $pass = '';
        $charset = 'utf8mb4';

        $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
        $pdo = new PDO($dsn, $user, $pass);
        $this->pdo = $pdo;
    }

    // partie connexion et inscription
    //inscription -----------------------------------------
    public function  insert($nom, $email, $password)
    {
        $sql = $this->pdo->prepare('INSERT INTO pharmacien (nom_complet	,email,mot_de_passe	) VALUE(?,?,?)');
        $sql->execute([$nom, $email, $password]);
        

    }
    // verifier la connexion-----------------------------------------------------
    public function verifier($email, $password)
    {
        $sql = $this->pdo->prepare('SELECT * FROM pharmacien where email=? and mot_de_passe=?');
        $sql->execute([$email, $password]);
        $user = $sql->FETCHALL(PDO::FETCH_ASSOC);
        if ($sql->rowCount() >= 1) {
            return $user;
        } else {
            return null;
        }
    }
    //--------------------------------------------------------------------fin

    // page acceil recherche simple 
    public function recherchesimple($query) {
        $sql = $this->pdo->prepare('SELECT * FROM products WHERE specialite LIKE :searchQuery');
        $searchQuery = "%" . $query . "%";
        $sql->bindParam(':searchQuery', $searchQuery, PDO::PARAM_STR);
        $sql->execute();
        $content = $sql->fetchAll(PDO::FETCH_ASSOC);
    
        if (count($content) >= 1) {
            return $content;
        } else {
            return null;
        }
    }
    
    // ---------------------------simple fin
    /* afficher  le detail de medicament */
    public function afficherMedicament($id){
        $sql=$this->pdo->prepare('SELECT * FROM products where id=?');
        $sql->execute([$id]);
        return $sql->fetchAll(PDO::FETCH_ASSOC);

    }//-------------------------fin



    // partie client acheter ou credis
    //partie valider
    public function validerClient ($idpharmacy,$id_product){
        $sql=$this->pdo->prepare('INSERT INTO vente(pharmacien_id	,date_vente,	product_id) value(?,?,?)  ');
        
        $date = new DateTime();
        $d=$date->format('y-m-d');
          

        

        $sql->execute([$idpharmacy,$d,$id_product]);


    }
    // partie credit
    public function creditClient(){


        $sql=$this->pdo->prepare('');
        $sql->execute([]);

    }
    //----------------------------fin client
    // -------------------index 
    public function index($id_phar){
        $sql=$this->pdo->prepare('SELECT specialite,date_vente,ppv,id FROM vente JOIN products on products.id=vente.product_id WHERE pharmacien_id=?');
        $sql->execute([$id_phar]);
        $content=$sql->fetchAll(PDO::FETCH_ASSOC);
        return $content;
    }



    //-------------------------------fin index
    // --------------stosk------------------------------------//
    public function ajouterStock($pharmacien_id	,$produit_id	,$quantite_en_stock){
        $sql=$this->pdo->prepare('SELECT quantite_en_stock FROM  stock WHERE  pharmacien_id=? and    produit_id	=?');
        $pi=floatval($produit_id);
         $phi=floatval($pharmacien_id);	

        $sql->execute([$phi	,$pi]);
        $q=$sql->fetch(PDO:: FETCH_ASSOC);
        $q1=floatval($q['quantite_en_stock']);
        if($q1>0){
           


            $new_quantity =$q1  + $quantite_en_stock ;            /* --------------------------------------------------------------------------------------- */
            $sql1=$this->pdo->prepare('UPDATE  stock SET quantite_en_stock=? WHERE  pharmacien_id=?	and produit_id	=?');
            $sql1->execute([ $new_quantity,$phi	,$pi]);
            return true;
        }

            else{ 
                
                return null;
            }
    }
    public function stock($pharmacien_id	,$produit_id	,$quantite_en_stock){
        $sql=$this->pdo->prepare('INSERT INTO stock (pharmacien_id	,produit_id	,quantite_en_stock) values (?,?,?)');
        $sql->execute([$pharmacien_id	,$produit_id	,$quantite_en_stock]);

    }


    



    public function testStock($pharmacien_id, $produit_id) {
        $sql = $this->pdo->prepare('SELECT quantite_en_stock FROM stock WHERE pharmacien_id = ? AND produit_id = ?');
        $sql->execute([$pharmacien_id, $produit_id]);
        $result = $sql->fetch(PDO::FETCH_ASSOC);
        return $result; 
      }
    
// -----------------partie client -----------------------


// l'insertion  les produit de client qui faire le credit

public function ajoutercredit($nom,$id,$medicament_id,$valider){
    $sql=$this->pdo->prepare('INSERT INTO credit (nomclient,id_pharmacie,id_products ,valider) values(?,?,?,?)');
    $sql->execute([$nom,$id,$medicament_id,$valider]);

}

}
