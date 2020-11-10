<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use Illuminate\Http\JsonResponse;

class ExpenseController extends Controller
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
            "data" => ["expenses" => Expense::all()]
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return JsonResponse
     */
    public function store()
    {
        $expense = new Expense();
        $expense->expense_type = request('expense_type');
        $expense->units = request('units');
        $expense->value = request('value');
        $expense->accrual = request('accrual');
        $expense->pay = request('pay');
        $expense->description = request('description');
        $expense->comment = request('comment');
        $expense->date = now();
        $expense->save();

        return response()->json([
            "status" => "success",
            "data" => ["expenses" => Expense::all()]
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
        $expense = Expense::find($id);

        $expense->expense_type = request('expense_type');
        $expense->units = request('units');
        $expense->value = request('value');
        $expense->accrual = request('accrual');
        $expense->pay = request('pay');
        $expense->description = request('description');
        $expense->comment = request('comment');
        $expense->save();

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
        Expense::destroy($id);

        return response()->json([
            "status" => "success",
            "data" => ["expenses" => Expense::all()]
        ], 200);
    }
}
