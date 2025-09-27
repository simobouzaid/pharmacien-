<?php

namespace App\Http\Controllers;

use App\Models\{produit, stock};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SearchController extends Controller
{
    public function Produitsearch(Request $request)
    {
        try {
            $produits = produit::where('user_id', Auth::id())
                ->whereNotIn('id', function ($query) {
                    $query->SELECT('produit_id')->from('stocks');
                })
                ->whereRaw('LOWER(name) LIKE ?', ['%' . strtolower($request->name) . '%'])
                ->get();

            return response()->json([
                'status' => true,
                'produits' => $produits
            ]);

        } catch (\Throwable $th) {
            return response()->json(['status' => false, $th]);

        }
    }
    public function venteProduitsearch(Request $request)
    {
        try {

            $produits = produit::where('produits.user_id', Auth::id())
                ->where('stocks.number', '>', 0)
                ->join('stocks', 'stocks.produit_id', '=', 'produits.id')
                ->whereRaw('LOWER(produits.name) LIKE ?', ['%' . strtolower($request->name) . '%'])
                ->select(
                    'produits.name as name',
                    'stocks.number as number',
                    'produits.presentation as presentation',
                    'produits.id as id',
                    'produits.form as form',
                    'produits.prix as prix',
                    'produits.dosage as dosage'
                )
                ->get();

            return response()->json([
                'status' => true,
                'produits' => $produits
            ]);
        } catch (\Throwable $th) {
            return response()->json(['status' => false, $th]);

        }
    }
    public function stockProduitsearch(Request $request)
    {

        try {


            $produits = produit::where('produits.user_id', Auth::id())
                ->join('stocks', 'stocks.produit_id', '=', 'produits.id')
                ->whereRaw('LOWER(produits.name) LIKE ?', ['%' . strtolower($request->name) . '%'])
                ->select(
                    'produits.name as name',
                    'stocks.number as number',
                    'stocks.id as idStock',
                    'produits.presentation as presentation',
                    'produits.id as id',
                    'produits.form as form',
                    'produits.prix as prix',
                    'produits.dosage as dosage'
                )
                ->get();


            return response()->json([
                'status' => true,
                'produits' => $produits
            ]);



        } catch (\Throwable $th) {
            return response()->json(['status' => false]);
        }
    }
}
