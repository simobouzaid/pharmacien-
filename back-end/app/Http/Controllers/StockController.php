<?php

namespace App\Http\Controllers;

use App\Models\produit;
use App\Models\stock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

            $produits = stock::where('user_id', Auth::id())->with('get_produit')->paginate(50);

            return response()->json([
                'status' => true,
                'produit' => $produits
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                $th
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $produit = stock::where('produit_id', $request->produitId)->first();
            if ($produit || $request->number > 0) {

                return response()->json([
                    'status' => false,
                    'msg' => 'le produits dans le stok'
                ]);
            }

            stock::create([
                'produit_id' => $request->produitId,
                'user_id' => Auth::id(),
                'number' => $request->number
            ]);
            return response()->json(['status' => true]);
        } catch (\Throwable $th) {
            return response()->json(['status' => false, $th]);

        }
    }

    /**
     * Display the specified resource.
     */
    public function show(stock $stock)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, stock $stock)
    {
        try {
            $stock->update([
                'produit_id' => $request->produit_id,
                'user_id' => Auth::id(),
                'number' => $request->number
            ]);
            return response()->json([
                'status' => true
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                       $th
            ]);
        }


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(stock $stock)
    {
        //
    }
}
