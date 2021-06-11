<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\BalanceHistory;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;

class BalanceHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $balance_history = BalanceHistory::orderBy('date', 'desc')->get();

        $previous_day_balance = 0;
        foreach ($balance_history as $balance_history_el) {
            if (Carbon::parse($balance_history_el->date)->format('Y-m-d') != today()->format('Y-m-d')) {
                $previous_day_balance = $balance_history_el->balance;
                break;
            }
       }
        $daily_income = $balance_history[0]->balance - $previous_day_balance;

        return response()->json([
            "status" => "success",
            "data" => [
                "daily_income" => $daily_income,
                "balance_history" => BalanceHistory::orderBy('date', 'asc')->get()
            ]
        ], 200);
    }
}
