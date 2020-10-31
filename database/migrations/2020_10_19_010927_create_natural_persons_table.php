<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Физические лица
class CreateNaturalPersonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('natural_persons', function (Blueprint $table) {
            $table->id();

            $table->integer('worker_id')->unsigned();
            $table->foreign('worker_id')
                ->references('id')->on('workers');

            $table->string('name');
            $table->string('surname');
            $table->string('middleware');
            $table->string('date_birth');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('natural_persons');
    }
}
