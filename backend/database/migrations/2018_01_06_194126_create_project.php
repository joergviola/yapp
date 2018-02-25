<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProject extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
	public function up()
	{
		Schema::create('project', function (Blueprint $table) {
			$table->increments('id');
			$table->string('name');
			$table->text('description')->nullable();
			$table->string('state');
			$table->date('starts_at')->nullable();
			$table->date('ends_at')->nullable();
			$table->integer('company_id')->unsigned();
			$table->integer('client_id')->unsigned();
			$table->timestamps();

			$table->foreign('company_id')->references('id')->on('company');
			$table->foreign('client_id')->references('id')->on('company');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('project');
	}
}
