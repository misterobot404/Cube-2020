<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Затраты
class CreateExpensesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();

            $table->string('expense_type')->unsigned();
            $table->foreign('expense_type')
                ->references('name')->on('expenses_types')->onUpdate('cascade')->onDelete('no action');

            // Вид расчёта
            $table->string('payment_type')->unsigned();
            $table->foreign('payment_type')
                ->references('name')->on('payment_types')->onUpdate('cascade')->onDelete('no action');

            // Надо
            $table->float('need_pay');
            // Начислено
            $table->float('current_pay');
            // Выплачено
            $table->float('pay_out');

            // Баланс
            $table->float('balance');

            $table->string('description')->nullable();
            $table->string('comment')->nullable();

            $table->dateTime('date');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('expenses');
    }
}
