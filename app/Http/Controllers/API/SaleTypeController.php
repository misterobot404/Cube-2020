<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\SalesType;
use Illuminate\Http\JsonResponse;

class SaleTypeController extends Controller
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
            "data" => ["sales_types" => SalesType::all()]
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return JsonResponse
     */
    public function store()
    {
        $expense = new SalesType();
        $expense->name = request('name');
        $expense->save();

        return response()->json([
            "status" => "success",
            "data" => ["sales_types" => SalesType::all()]
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param $old_name
     * @return JsonResponse
     */
    public function update($old_name)
    {
        $expense = SalesType::find($old_name);
        $expense->name = request('new_name');
        $expense->save();

        return response()->json([
            "status" => "success"
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $name
     * @return JsonResponse
     */
    public function destroy($name)
    {
        SalesType::destroy($name);

        return response()->json([
            "status" => "success",
            "data" => ["sales_types" => SalesType::all()]
        ], 200);
    }
}
