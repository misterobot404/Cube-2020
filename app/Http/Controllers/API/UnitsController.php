<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Units;
use Illuminate\Http\JsonResponse;


class UnitsController extends Controller
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
            "data" => ["units" => Units::all()]
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return JsonResponse
     */
    public function store()
    {
        $expense = new Units();
        $expense->name = request('name');
        $expense->save();

        return response()->json([
            "status" => "success",
            "data" => ["units" => Units::all()]
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
        $expense = Units::find($old_name);
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
        Units::destroy($name);

        return response()->json([
            "status" => "success",
            "data" => ["units" => Units::all()]
        ], 200);
    }
}
