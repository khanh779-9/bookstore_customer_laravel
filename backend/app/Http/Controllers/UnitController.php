<?php

namespace App\Http\Controllers;

use App\Models\DonViTinh;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    public function index(Request $request)
    {
        $units = DonViTinh::all();
        return response()->json($units);
    }
}
