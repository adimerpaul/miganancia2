<?php

namespace App\Http\Controllers;

use App\Models\Negocio;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(Request $request){
        $request->validate([
            'email'=>'required|unique:users|email',
            'password' => 'required|confirmed|min:6',
//            'carnet'=>'required|unique:users',
        ]);
//        return $request;
        $user=new User();
        $user->name= $request->name;
        $user->email=$request->email;
        $user->password=Hash::make( $request->password);
//        $user->carnet=$request->carnet;
//        $user->unit_id=$request->unit_id;
        $user->fechalimite=date('Y-m-d', strtotime(now(). ' + 360 days'));;
        $user->save();
        $negocio=new Negocio();
        $negocio->foto=$request->foto==null?'default.png':$request->foto;
        $negocio->tipo=$request->tipo;
        $negocio->nombre=$request->nombre;
        $negocio->direccion=$request->direccion;
        $negocio->ciudad=$request->ciudad;
        $negocio->user_id=$user->id;
        $negocio->save();
        $user->minegocio=$negocio->id;
        $user->save();
//        return $negocio;
//        $permiso = Permiso::find([3]);
//        $user->permisos()->attach($permiso);
        $token=$user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'token'=>$token,
            'user'=>User::where('id',$user->id)
                ->with('negocios')
//                ->with('permisos')
//                ->with('unit')
                ->firstOrFail()
        ],200);
    }
    public function login(Request $request){
        if (!Auth::attempt($request->all())){
            return response()->json(['res'=>'No existe el usuario'],400);
        }
        if (User::where('email',$request->email)->whereDate('fechalimite','>',now())->get()->count()==0){
            return response()->json(['res'=>'Su usuario sobre paso el limite de ingreso'],400);
        }

        $user=User::where('email',$request->email)
//            ->with('unid')
//            ->with('permisos')
            ->with('negocios')
            ->firstOrFail();
        $token=$user->createToken('auth_token')->plainTextToken;
        return response()->json(['token'=>$token,'user'=>$user],200);
    }
    public function pass(Request $request,User $user){
//        return $request->password;
        $user->update([
            'password'=>Hash::make($request->password)
        ]);
        return $user;
    }
    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->json(['res'=>'salido exitosamente'],200);
    }
    public function me(Request $request){
//        $user=$request->user()->with('unid')->with('permisos')->firstOrFail();
//        $user=$request->user()
        $user=User::where('id',$request->user()->id)
//            ->with('unid')
//            ->with('permisos')
            ->with('negocios')
            ->firstOrFail();
        return $user;

//        return User::where('id',1)->with('unid')->get();
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $user->update($request->all());
//        return response()->json([
//            "user"=>$request->user(),
//            "negocios"=>Negocio::where('user_id',$request->user()->id)->get()
//        ],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
