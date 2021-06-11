<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Поступления
class CreateIncomesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('incomes', function (Blueprint $table) {
            $table->id();

            // Тип поступления
            $table->string('income_type')->unsigned();
            $table->foreign('income_type')
                ->references('name')->on('incomes_types')->onUpdate('cascade')->onDelete('no action');

            // Вид расчёта
            $table->string('payment_type')->unsigned();
            $table->foreign('payment_type')
                ->references('name')->on('payment_types')->onUpdate('cascade')->onDelete('no action');

            // Значение поступления
            $table->float('value');
            // Дата поступления
            $table->dateTime('date');
            // Описание / комментарий
            $table->string('description')->nullable();;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('incomes');
    }
}
