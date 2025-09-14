<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class stock extends Model
{
 protected $fillable=['produit_id','user_id','number'];


    public function get_produit(){
       return $this->belongsTo(produit::class,'produit_id');
    }
}
