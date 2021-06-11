<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ExpensesType;
use App\Models\IncomesType;
use Illuminate\Http\JsonResponse;

class ExpenseTypeController extends Controller
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
            "data" => ["expenses_types" => ExpensesType::all()]
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return JsonResponse
     */
    public function store()
    {
        $expense_type = new ExpensesType();
        $expense_type->name = request('name');
        $expense_type->need_pay = 0;
        $expense_type->current_pay = 0;
        $expense_type->pay_out = 0;
        $expense_type->balance = 0;
        $expense_type->super_type = request('super_type');
        $expense_type->save();

        if (request('super_type')) {
            $income_type = new IncomesType();
            $income_type->name = request('name');
            $income_type->super_type = true;
            $income_type->save();
        }

        return response()->json([
            "status" => "success",
            "data" => ["expenses_types" => ExpensesType::all()]
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param $name
     * @return JsonResponse
     */
    public function update($name)
    {
        $expense_type = ExpensesType::find($name);
        $expense_type->name = request('new_name');
        $expense_type->need_pay = request('need_pay');
        $expense_type->current_pay = request('current_pay');
        $expense_type->pay_out = request('pay_out');
        $expense_type->save();

        if ($expense_type->super_type) {
            $income_type = IncomesType::find($name);
            $income_type->name = request('new_name');
            $income_type->save();
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
        if ((ExpensesType::find($name))->super_type)
            IncomesType::destroy($name);

        ExpensesType::destroy($name);

        return response()->json([
            "status" => "success",
            "data" => ["expenses_types" => ExpensesType::all()]
        ], 200);
    }
}
