<?php

namespace App\Http\Controllers;

use App\Models\{vente, stock};

use Illuminate\Http\Request;
use Illuminate\Support\Facades\{Auth, DB};

class VenteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

            $ventes = vente::join('produits', 'ventes.produit_id', '=', 'produits.id')
                ->select(
                    'produits.name',
                    'produits.form',
                    'produits.presentation',
                    'produits.dosage',
                    'produits.prix',
                    DB::raw('COUNT(produit_id) as number')
                )
                ->where('produits.user_id', Auth::id())
                ->where('ventes.status', false)
                ->groupBy(

                    'produits.name',
                    'produits.form',
                    'produits.presentation',
                    'produits.dosage',
                    'produits.prix',

                )
                ->get();

            return response()->json([
                'status' => true,
                'ventes' => $ventes

            ]);
        } catch (\Throwable $th) {
            return response()->json(['status' => false, $th]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $stock = stock::where('produit_id', $request->produit_id)->where('user_id', auth::id())->first();
            $Commande = vente::join('produits', 'ventes.produit_id', '=', 'produits.id')
                ->select(DB::raw('COUNT(produit_id) as total'))
                ->where('produits.user_id', Auth::id())
                ->where('ventes.status', false)
                ->where('produits.id', $request->produit_id)
                ->first();

            if ($stock->number > $Commande->total) {

                vente::create([
                    'user_id' => Auth::id(),
                    'produit_id' => $request->produit_id,
                    'status' => false
                ]);

                return response()->json(['status' => true, 'dd' => [$stock->number, $Commande->total+1]]);
            }
            return response()->json(['status' => false, $Commande->total]);
        } catch (\Throwable $th) {
            return response()->json(['status' => false, 'error' => $th->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(vente $vente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update()
    {


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(vente $vente)
    {
        try {
            $vente->delete();
            return response()->json(['status' => true]);

        } catch (\Throwable $th) {
            return response()->json(data: ['status' => false, $th]);

        }
    }

    // valider le vente 

    //suprimmer le vente ne pas valide

    public function suprimmerVenteNonValide()
    {
        try {

            vente::where('user_id', Auth::id())->where('status', false)->delete();
            return response()->json(['status' => true]);
        } catch (\Throwable $th) {
            return response()->json(data: ['status' => false, $th]);
            //throw $th;
        }
    }




    public function validerVente()
    {
        try {
            $this->decrementStock();

            vente::where('user_id', Auth::id())->where('status', false)->update([
                //code...
                'status' => true
            ]);


            return response()->json(['status' => true]);
        } catch (\Throwable $th) {
            return response()->json(['status' => false, $th]);
            //throw $th;
        }
    }


    private function decrementStock()
    {
        $produits = vente::where('user_id', Auth::id())
            ->where('status', false)
            ->selectRaw(
                'count(produit_id) as total
                ,produit_id as id'
            )
            ->groupBy('produit_id')
            ->get();
        foreach ($produits as $produit) {
            $number = stock::where('produit_id', $produit->id)->first('number');
            stock::where('produit_id', $produit->id)->update([
                'number' => $number->number - $produit->total
            ]);
        }
    }


    //------------------------
    public function indexProduitVente()
    {
        try {
            $produits = stock::where('user_id', Auth::id())->whereRaw('number > 0')->with('get_produit')->paginate(100);
             
          

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





    //  afficher les historique


    public function indexHistorique()
    {
        try {

            $ventes = vente::join('produits', 'ventes.produit_id', '=', 'produits.id')
                ->select(
                    'ventes.id as idVente',
                    'produits.name',
                    'ventes.created_at',
                    'produits.form',
                    'produits.presentation',
                    'produits.dosage',
                    'produits.prix',
                )

                ->where('produits.user_id', Auth::id())
                ->where('ventes.status', true)

                ->paginate(100);

            return response()->json([
                'status' => true,
                'ventes' => $ventes

            ]);
        } catch (\Throwable $th) {
            return response()->json(['status' => false, $th]);
        }
    }


}
