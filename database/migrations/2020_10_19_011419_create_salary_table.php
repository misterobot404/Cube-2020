<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Заработная плата
class CreateSalaryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('salary', function (Blueprint $table) {
            $table->id();

            // Id работника
            $table->integer('worker_id')->unsigned();
            $table->foreign('worker_id')
                ->references('id')->on('workers');
            // Id сотрудника
            $table->integer('salary_type_id')->unsigned();
            $table->foreign('salary_type_id')
                ->references('id')->on('salary_type');

            // Размер зарплаты
            $table->float('value');
            // Начислено
            $table->string('accrual');
            // Выплачено
            $table->string('pay');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('salary');
    }
}
