<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategoriesTagsTable extends Migration
{
   /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories_tags', function(Blueprint $table)
        {
            $table->integer('idTag');
            $table->integer('idCategorie');
            $table->primary(['idTag', 'idCategorie']);
            $table->foreign('idTag')->references('id')->on('tags');
            $table->foreign('idCategorie')->references('id')->on('categories');
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
        Schema::drop('categories_tags');
    }
}