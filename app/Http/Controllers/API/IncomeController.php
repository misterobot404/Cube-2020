<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ExpensesType;
use App\Models\Income;
use App\Models\IncomesType;
use App\Models\PaymentType;
use App\Models\BalanceHistory;
use Illuminate\Http\JsonResponse;

class IncomeController extends Controller
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
            "data" => ["incomes" => Income::all()]
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return JsonResponse
     */
    public function store()
    {
        $income = new Income();
        $income->income_type = request('income_type');
        $income->payment_type = request('payment_type');
        $income->value = request('value');
        $income->description = request('description');
        $income->date = now();
        $income->save();

        $expense_type = ExpensesType::find(request('income_type'));
        if ($expense_type) {
            if ($expense_type->super_type) {
                $expense_type->current_pay -= $income->value;
                $expense_type->balance -= $income->value;
                $expense_type->save();
            }
        }

        $payment_type = PaymentType::find(request('payment_type'));
        $payment_type->balance += request('value');
        $payment_type->save();

        BalanceHistory::recalculation();

        return response()->json([
            "status" => "success",
            "data" => ["incomes" => Income::all()]
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
        $income = Income::find($id);

        $payment_type = PaymentType::find($income->payment_type);
        $payment_type->balance -= $income->value;
        $payment_type->save();

        $income->income_type = request('income_type');
        $income->payment_type = request('payment_type');
        $income->value = request('value');
        $income->description = request('description');
        $income->save();

        $payment_type = PaymentType::find(request('payment_type'));
        $payment_type->balance += request('value');
        $payment_type->save();

        BalanceHistory::recalculation();

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
        $income = Income::find($id);

        $payment_type = PaymentType::find($income->payment_type);
        $payment_type->balance -= $income->value;
        $payment_type->save();

        Income::destroy($id);

        BalanceHistory::recalculation();

        return response()->json([
            "status" => "success",
            "data" => ["incomes" => Income::all()]
        ], 200);
    }
}
