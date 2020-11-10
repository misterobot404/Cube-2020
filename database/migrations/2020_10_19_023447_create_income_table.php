<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Поступления
class CreateIncomeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('income', function (Blueprint $table) {
            $table->id();

            // Тип поступления
            $table->string('income_types')->unsigned();
            $table->foreign('income_types')
                ->references('name')->on('income_types');

            // Единица измерения (по умолчанию рубли)
            $table->string('units')->unsigned();
            $table->foreign('units')
                ->references('name')->on('units');

            // Вид расчёта
            $table->string('calculation_types')->unsigned();
            $table->foreign('calculation_types')
                ->references('name')->on('calculation_types');

            // Значение поступления
            $table->float('value');
            // Дата поступления
            $table->dateTime('date');
            // Описание / комментарий
            $table->string('description');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('income');
    }
}
