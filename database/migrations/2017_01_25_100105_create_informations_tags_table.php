<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInformationsTagsTable extends Migration
{
   /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('informations_tags', function(Blueprint $table)
        {
            $table->integer('idTag');
            $table->integer('idInformation');
            $table->primary(['idTag', 'idInformation']);
            $table->foreign('idTag')->references('id')->on('tags');
            $table->foreign('idInformation')->references('id')->on('informations');
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
        Schema::drop('informations_tags');
    }
}