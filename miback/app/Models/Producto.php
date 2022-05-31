<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;
    protected $fillable=[
        "nombre",
        "codigo",
        "cantidad",
        "costo",
        "precio",
        "foto",
        "descripcion",
        "visible",
        "categoria_id",
        "negocio_id",
    ];
}
