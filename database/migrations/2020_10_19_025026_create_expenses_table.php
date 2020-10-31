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

            $table->integer('expense_type_id')->unsigned();
            $table->foreign('expense_type_id')
                ->references('id')->on('expense_type');

            $table->integer('units')->unsigned();
            $table->foreign('units')
                ->references('id')->on('units');

            $table->float('value');
            $table->dateTime('date');

            $table->string('description');
            $table->string('comment');
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
