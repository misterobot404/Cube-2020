<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->id();

            $table->string('sale_type')->unsigned();
            $table->foreign('sale_type')
                ->references('name')->on('sales_types')->onUpdate('cascade')->onDelete('no action');

            $table->string('units')->unsigned();
            $table->foreign('units')
                ->references('name')->on('units')->onUpdate('cascade')->onDelete('no action');

            $table->float('value');
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
        Schema::dropIfExists('sales');
    }
}
