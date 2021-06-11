<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\BalanceHistory;
use App\Models\PaymentType;
use Illuminate\Http\JsonResponse;

class PaymentTypeController extends Controller
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
            "data" => ["payment_types" => PaymentType::all()]
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return JsonResponse
     */
    public function store()
    {
        $expense = new PaymentType();
        $expense->name = request('name');
        $expense->save();

        return response()->json([
            "status" => "success",
            "data" => ["payment_types" => PaymentType::all()]
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
        $expense = PaymentType::find($old_name);
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
        PaymentType::destroy($name);

        BalanceHistory::recalculation();

        return response()->json([
            "status" => "success",
            "data" => ["payment_types" => PaymentType::all()]
        ], 200);
    }
}
