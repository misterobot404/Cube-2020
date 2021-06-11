<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\BalanceHistoryController;
use App\Http\Controllers\API\ExpenseController;
use App\Http\Controllers\API\ExpenseTypeController;
use App\Http\Controllers\API\SaleTypeController;
use App\Http\Controllers\API\SaleController;
use App\Http\Controllers\API\IncomeController;
use App\Http\Controllers\API\IncomeTypeController;
use App\Http\Controllers\API\UnitsController;
use App\Http\Controllers\API\PaymentTypeController;


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/users', [AuthController::class, 'getUsers']);
});

Route::get('/balance_history', [BalanceHistoryController::class, 'index']);

// Sales
Route::get('/sales', [SaleController::class, 'index']);
Route::post('/sales', [SaleController::class, 'store']);
Route::put('/sales/{id}', [SaleController::class, 'update']);
Route::delete('/sales/{id}', [SaleController::class, 'destroy']);
// Sales types
Route::get('/sales_types', [SaleTypeController::class, 'index']);
Route::post('/sales_types', [SaleTypeController::class, 'store']);
Route::put('/sales_types/{old_name}', [SaleTypeController::class, 'update']);
Route::delete('/sales_types/{name}', [SaleTypeController::class, 'destroy']);

// Expenses
Route::get('/expenses', [ExpenseController::class, 'index']);
Route::post('/expenses', [ExpenseController::class, 'store']);
Route::put('/expenses/{id}', [ExpenseController::class, 'update']);
Route::delete('/expenses/{id}', [ExpenseController::class, 'destroy']);
// Expenses types
Route::get('/expenses_types', [ExpenseTypeController::class, 'index']);
Route::post('/expenses_types', [ExpenseTypeController::class, 'store']);
Route::put('/expenses_types/{name}', [ExpenseTypeController::class, 'update']);
Route::delete('/expenses_types/{name}', [ExpenseTypeController::class, 'destroy']);

// Income
Route::get('/incomes', [IncomeController::class, 'index']);
Route::post('/incomes', [IncomeController::class, 'store']);
Route::put('/incomes/{id}', [IncomeController::class, 'update']);
Route::delete('/incomes/{id}', [IncomeController::class, 'destroy']);
// Income types
Route::get('/incomes_types', [IncomeTypeController::class, 'index']);
Route::post('/incomes_types', [IncomeTypeController::class, 'store']);
// fix
Route::put('/incomes_types/rename', [IncomeTypeController::class, 'update']);
Route::delete('/incomes_types/{name}', [IncomeTypeController::class, 'destroy']);

// Payment types
Route::get('/payment_types', [PaymentTypeController::class, 'index']);
Route::post('/payment_types', [PaymentTypeController::class, 'store']);
Route::put('/payment_types/{old_name}', [PaymentTypeController::class, 'update']);
Route::delete('/payment_types/{name}', [PaymentTypeController::class, 'destroy']);
// Units
Route::get('/units', [UnitsController::class, 'index']);
Route::post('/units', [UnitsController::class, 'store']);
Route::put('/units/{old_name}', [UnitsController::class, 'update']);
Route::delete('/units/{name}', [UnitsController::class, 'destroy']);
