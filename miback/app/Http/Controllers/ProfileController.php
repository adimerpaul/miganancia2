<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\Permiso;
use App\Http\Requests\StoreProfileRequest;
use App\Http\Requests\UpdateProfileRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
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

    public function listaperfil(Request $request){
        return Profile::where('negocio_id',$request->negocio_id)->get();
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreProfileRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProfileRequest $request)
    {
        //
        $profile=new Profile;
        $profile->nombre=strtoupper($request->nombre);
        $profile->negocio_id=$request->negocio_id;
        $profile->save();

        $permisos=Permiso::all();
        foreach ($permisos as $value) {
           DB::SELECT("INSERT into permiso_profile (permiso_id,profile_id,estado) values ($value->id,$profile->id,0)");
        }

        foreach ($request->permisos as $r) {
            DB::SELECT("UPDATE permiso_profile set estado=1 where profile_id=$profile->id and permiso_id=$r");
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function show(Profile $profile)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function edit(Profile $profile)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProfileRequest  $request
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProfileRequest $request, Profile $profile)
    {
        //
        $profile=Profile::find($request->id);
        $profile->nombre=strtoupper($request->nombre);
        $profile->save();

        DB::SELECT("UPDATE from permiso_profile set estado=0 where profile_id=$profile_id ");

        foreach ($request->permisos as $r) {
            DB::SELECT("UPDATE from permiso_profile set estado=1 where profile_id=$profile_id and permiso_id=$r");
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function destroy(Profile $profile)
    {
        //
    }
}
