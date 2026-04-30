<?php

namespace App\Http\Controllers;

use App\Http\Resources\LoaiSachResource;
use App\Models\LoaiSach;
use Illuminate\Http\Request;

class LoaiSachController extends Controller
{
    public function index(Request $request)
    {
        $types = LoaiSach::all();
        return LoaiSachResource::collection($types);
    }
}
