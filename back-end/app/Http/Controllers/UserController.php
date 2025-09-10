<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
              user::create([
                          'name'=>$request->name,
                          'prenom'=>$request->prenom,
                          'email'=>$request->email,
                          'password'=>$request->password,
              ]);

              return response()->json(['status'=>true]);
            } catch (\Throwable $th) {
              return response()->json(['status'=>false,$th]);
            //throw $th;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
