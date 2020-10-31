<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Премии
class CreatePremiumsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('premiums', function (Blueprint $table) {
            $table->id();
            // Id работника
            $table->integer('worker_id')->unsigned();
            $table->foreign('worker_id')
                ->references('id')->on('workers');
            // Дата назначения премии
            $table->dateTime('date');
            // Размер премии
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
        Schema::dropIfExists('premiums');
    }
}
