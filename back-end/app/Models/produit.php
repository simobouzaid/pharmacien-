<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class produit extends Model
{
    protected $fillable =['name','prix','form','presentation','dosage','user_id'];

    public function get_stock(){
        return $this->hasMany(stock::class ,'produit_id');
    }
}
