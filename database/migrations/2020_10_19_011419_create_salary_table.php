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
            $table->string('salary_type')->unsigned();
            $table->foreign('salary_type')
                ->references('name')->on('salary_type');

            // Размер зарплаты
            $table->float('value');
            // Начислено
            $table->float('accrual');
            // Выплачено
            $table->float('pay');
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
