<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;
    protected $fillable=[
        "fecha",
        "hora",
        "concepto",
        "medio",
        "valor",
        "cliente_id",
        "provider_id",
        "user_id",
        "tipo",
        "negocio_id",
    ];
}
