<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ExpensesType;
use App\Models\IncomesType;
use Illuminate\Http\JsonResponse;

class IncomeTypeController extends Controller
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
            "data" => ["incomes_types" => IncomesType::all()]
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return JsonResponse
     */
    public function store()
    {
        $income_type = new IncomesType();
        $income_type->name = request('name');
        $income_type->super_type = request('super_type');
        $income_type->save();

        if (request('super_type')) {
            $expense_type = new ExpensesType();
            $expense_type->name = request('name');
            $expense_type->need_pay = 0;
            $expense_type->current_pay = 0;
            $expense_type->pay_out = 0;
            $expense_type->balance = 0;
            $expense_type->super_type = true;
            $expense_type->save();
        }

        return response()->json([
            "status" => "success",
            "data" => ["incomes_types" => IncomesType::all()]
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param $old_name
     * @return JsonResponse
     */
    public function update()
    {
        $income_type = IncomesType::find(request('old_name'));
        $income_type->name = request('new_name');
        $income_type->save();

        if ($income_type->super_type) {
            $expense_type = ExpensesType::find(request('old_name'));
            $expense_type->name = request('new_name');
            $expense_type->save();
        }

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
        if ((IncomesType::find($name))->super_type)
            ExpensesType::destroy($name);

        IncomesType::destroy($name);

        return response()->json([
            "status" => "success",
            "data" => ["incomes_types" => IncomesType::all()]
        ], 200);
    }
}
