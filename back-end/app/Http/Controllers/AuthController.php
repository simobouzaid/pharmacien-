<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $r){
              try {
               $response = Auth::attempt(['email'=>$r->email,'password' => $r->password]);
               if ($response) {
                return response()->json([
                    'status' => true,
                    'token'=>Auth::user()->createToken('auth_token')->plainTextToken,
                    'user'=>Auth::user()
                ]);
               }

               return response()->json(['status'=>false]);
              } catch (\Throwable $th) {
              
               return response()->json(['status'=>false,$th]);
              }
    } 
}
