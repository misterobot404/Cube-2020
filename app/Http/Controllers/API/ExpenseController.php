<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\BalanceHistory;
use App\Models\Expense;
use App\Models\ExpensesType;
use App\Models\PaymentType;
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
        $expense->payment_type = request('payment_type');
        $expense->need_pay = request('need_pay');
        $expense->current_pay = request('current_pay');
        $expense->pay_out = request('pay_out');
        $expense->balance = request('current_pay') - request('pay_out');
        $expense->description = request('description');
        $expense->comment = request('comment');
        $expense->date = now();
        $expense->save();

        // Изменение баланса статьи
        $expense_type = ExpensesType::find(request('expense_type'));
        $expense_type->need_pay = request('need_pay');
        $expense_type->current_pay = request('current_pay');
        $expense_type->pay_out = request('pay_out');
        $expense_type->balance = request('current_pay') - request('pay_out');
        $expense_type->save();

        // Изменение баланса кошелька
        $payment_type = PaymentType::find(request('payment_type'));
        $payment_type->balance -= request('current_pay');
        $payment_type->save();

        BalanceHistory::recalculation();

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

        // Изменение баланса статьи
        $expense_type = ExpensesType::find(request('expense_type'));
        $expense_type->need_pay -= $expense->need_pay;
        $expense_type->current_pay -= $expense->current_pay;
        $expense_type->pay_out -= $expense->pay_out;
        $expense_type->balance -= $expense->balance;
        $expense_type->save();

        // Изменение баланса кошелька
        $payment_type = PaymentType::find($expense->payment_type);
        $payment_type->balance += $expense->current_pay;
        $payment_type->save();

        $expense->expense_type = request('expense_type');
        $expense->payment_type = request('payment_type');
        $expense->need_pay = request('need_pay');
        $expense->current_pay = request('current_pay');
        $expense->pay_out = request('pay_out');
        $expense->balance = request('current_pay') - request('pay_out');
        $expense->description = request('description');
        $expense->comment = request('comment');
        $expense->save();

        // Изменение баланса статьи
        $expense_type->need_pay += $expense->need_pay;
        $expense_type->current_pay += $expense->current_pay;
        $expense_type->pay_out += $expense->pay_out;
        $expense_type->balance += $expense->balance;
        $expense_type->save();

        $payment_type = PaymentType::find(request('payment_type'));
        $payment_type->balance -= $expense->current_pay;
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
        $expense = Expense::find($id);

        // Изменение баланса статьи
        $expense_type = ExpensesType::find($expense->expense_type);
        $expense_type->need_pay -= $expense->need_pay;
        $expense_type->current_pay -= $expense->current_pay;
        $expense_type->pay_out -= $expense->pay_out;
        $expense_type->balance -= $expense->balance;
        $expense_type->save();

        // Изменение баланса кошелька
        $payment_type = PaymentType::find($expense->payment_type);
        $payment_type->balance += $expense->current_pay;
        $payment_type->save();

        Expense::destroy($id);

        BalanceHistory::recalculation();

        return response()->json([
            "status" => "success",
            "data" => ["expenses" => Expense::all()]
        ], 200);
    }
}
