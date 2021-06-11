<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Типы затрат
class CreateExpensesTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('expenses_types', function (Blueprint $table) {
            $table->string('name')->primary();

            // Признак супер статьи
            $table->boolean('super_type');

            // Суммарные значения расходов по данной статье
            // Надо
            $table->float('need_pay');
            // Начислено
            $table->float('current_pay');
            // Выплачено
            $table->float('pay_out');

            // Баланс
            $table->float('balance');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('expenses_types');
    }
}
