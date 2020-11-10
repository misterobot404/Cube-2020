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
                ->references('name')->on('expense_type');

            $table->string('units')->unsigned();
            $table->foreign('units')
                ->references('name')->on('units');

            // Размер
            $table->float('value');
            // Начислено
            $table->float('accrual');
            // Выплачено
            $table->float('pay');

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
