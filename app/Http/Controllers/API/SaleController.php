<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Sale;
use Illuminate\Http\JsonResponse;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        return response()->json([
            "status" => "success",
            "data" => ["sales" => Sale::all()]
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return JsonResponse
     */
    public function store()
    {
        $sale = new Sale();
        $sale->sale_type = request('sale_type');
        $sale->units = request('units');
        $sale->value = request('value');
        $sale->date = now();
        $sale->save();

        return response()->json([
            "status" => "success",
            "data" => ["sales" => Sale::all()]
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param $id
     * @return JsonResponse
     */
    public function update($id)
    {
        $sale = Sale::find($id);

        $sale->sale_type = request('sale_type');
        $sale->units = request('units');
        $sale->value = request('value');
        $sale->save();

        return response()->json([
            "status" => "success"
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        Sale::destroy($id);

        return response()->json([
            "status" => "success",
            "data" => ["sales" => Sale::all()]
        ], 200);
    }
}
