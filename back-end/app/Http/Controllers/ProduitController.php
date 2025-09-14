<?php

namespace App\Http\Controllers;

use App\Models\{produit, stock};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProduitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $produits = produit::where('user_id', Auth::id())->paginate(50);

            return response()->json([
                'status' => true,
                'produits' => $produits
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,$th

            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $produit = produit::where('name', $request->name)
                ->where('prix', $request->prix)
                ->where('form', $request->form)
                ->where('presentation', $request->presentation)
                ->where('dosage', $request->dosage)
                ->where('user_id', Auth::id())
                ->first();
            if ($produit) {
                return response()->json([
                    'status' => false,
                    'msg' => 'le produits deja dans la base de donner'
                ]);
            }

               produit::create([
                'name'=>$request->name,
                'prix'=> $request->prix,
                'form'=> $request->form,
                'presentation'=> $request->presentation,
                'dosage'=> $request->dosage,
                'user_id'=> Auth::id()
        ]);

       return response()->json([ 'status' => true,]);
        } catch (\Throwable $th) {
             return response()->json([
                    'status' => false,
                    $th
                ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(produit $produit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, produit $produit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(produit $produit)
    {
        //
    }
}
