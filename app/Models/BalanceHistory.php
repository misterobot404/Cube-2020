<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BalanceHistory extends Model
{
    use HasFactory;
    protected $table = 'balance_history';
    public $timestamps = false;

    static public function recalculation()
    {
        $balance = 0.0;

        // добавление баланса из кошельков
        $payment_types = PaymentType::all();
        foreach ($payment_types as $payment_type) {
            $balance += $payment_type->balance;
        }

        // добавление баланса из статей
        $expenses_type = ExpensesType::all();
        foreach ($expenses_type as $expense_type) {
            $balance += $expense_type->balance;
        }

        $income = new BalanceHistory();
        $income->balance = $balance;
        $income->date = now();
        $income->save();
    }
}
