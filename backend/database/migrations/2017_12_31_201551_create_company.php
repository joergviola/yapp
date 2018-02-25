<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompany extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
	public function up()
	{
		Schema::create('company', function (Blueprint $table) {
			$table->increments('id');
			$table->string('name');
			$table->string('website');
			$table->string('email');
			$table->string('telefone');
			$table->timestamps();
		});

		Schema::table('user', function(Blueprint $table)
		{
			$table->integer('company_id')->unsigned();

			$table->foreign('company_id')->references('id')->on('company');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('user', function(Blueprint $table)
		{
			$table->dropColumn('company_id');
		});

		Schema::dropIfExists('company');
	}
}
