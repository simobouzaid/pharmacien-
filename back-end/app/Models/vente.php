<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class vente extends Model
{
    protected $fillable =['user_id','produit_id'];
    public function get_produit(){
       return $this->belongsTo(produit::class,'produit_id');
    }
}
