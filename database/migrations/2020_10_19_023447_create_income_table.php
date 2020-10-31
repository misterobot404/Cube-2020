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
            $table->integer('income_types_id')->unsigned();
            $table->foreign('income_types_id')
                ->references('id')->on('income_types');

            // Единица измерения (по умолчанию рубли)
            $table->integer('units')->unsigned();
            $table->foreign('units')
                ->references('id')->on('units');

            // Вид расчёта
            $table->integer('calculation_types_id')->unsigned();
            $table->foreign('calculation_types_id')
                ->references('id')->on('calculation_types');

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
