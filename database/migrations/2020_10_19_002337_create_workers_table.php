<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Работники
class CreateWorkersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('workers', function (Blueprint $table) {
            $table->id();
            // Id должности
            $table->integer('position_id')->unsigned();
            $table->foreign('position_id')
                ->references('id')->on('positions');
            // Дата трудоустройства
            $table->dateTime("date_in");
            // Дата увольнения
            $table->dateTime("date_out")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('workers');
    }
}
