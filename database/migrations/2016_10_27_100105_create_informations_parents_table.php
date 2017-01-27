<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInformationsParentsTable extends Migration
{
   /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('informations_parents', function(Blueprint $table)
        {
            $table->integer('idParent');
            $table->integer('idEnfant');
            $table->primary(['idParent', 'idEnfant']);
            $table->foreign('idParent')->references('id')->on('categories');
            $table->foreign('idEnfant')->references('id')->on('informations');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('informations_parents');
    }
}