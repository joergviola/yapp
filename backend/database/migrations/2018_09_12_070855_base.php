<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Base extends Migration
{

    protected function standard($table, $foreign=true) {
        $table->increments('id');
        $table->integer('company_id')->unsigned();
        $table->string('state');
        $table->timestamps();
        $table->integer('created_by')->unsigned();
        $table->integer('updated_by')->unsigned();

        if ($foreign) {
            $table->foreign('company_id')->references('id')->on('company');
            $table->foreign('created_by')->references('id')->on('user');
            $table->foreign('updated_by')->references('id')->on('user');
        }
    }

    public function up()
    {
        $this->companyAndUser();

        Schema::create('project', function (Blueprint $table) {
            $this->standard($table);
            $table->string('name');
            $table->text('description')->nullable();
            $table->date('starts_at')->nullable();
            $table->date('ends_at')->nullable();
            $table->integer('client_id')->unsigned();

            $table->foreign('client_id')->references('id')->on('company');
        });

        $this->insert('company', [
            'name' => 'Acme',
        ]);

        $this->insert('project', [
            'name' => 'Website',
            'state' => 'Lead',
            'client_id' => 2,
        ]);
        $this->insert('project', [
            'name' => 'Configurator',
            'state' => 'Ordered',
            'client_id' => 2,
        ]);
    }

    public function down()
    {
        Schema::dropIfExists('project');

        Schema::table('company', function(Blueprint $table)
        {
            $table->dropForeign(['company_id']);
            $table->dropForeign(['created_by']);
            $table->dropForeign(['updated_by']);
        });

        Schema::table('user', function(Blueprint $table)
        {
            $table->dropForeign(['role_id']);
            $table->dropForeign(['company_id']);
            $table->dropForeign(['created_by']);
            $table->dropForeign(['updated_by']);
        });

        Schema::dropIfExists('right');
        Schema::dropIfExists('role');
        Schema::dropIfExists('user');
        Schema::dropIfExists('company');
    }

    private function insert($table, $row) {
        DB::table($table)->insert(array_merge([
            'company_id' => 1,
            'state' => 'New',
            'created_by' => 1,
            'updated_by' => 1,
            'created_at' => new \DateTime(),
            'updated_at' => new \DateTime()
        ], $row));
    }

    private function companyAndUser()
    {
        Schema::create('role', function (Blueprint $table) {
            $this->standard($table, false);
            $table->string('name');
        });

        Schema::create('company', function (Blueprint $table) {
            $this->standard($table, false);
            $table->string('name');
            $table->text('address')->nullable();
            $table->string('website')->nullable();
            $table->string('email')->nullable();
            $table->string('telefone')->nullable();
        });

        Schema::create('user', function (Blueprint $table) {
            $this->standard($table);
            $table->string('name');
            $table->string('email')->unique();
            $table->string('telefone')->nullable();
            $table->string('username')->nullable();
            $table->string('password')->nullable();
            $table->integer('role_id')->unsigned();
            $table->rememberToken();

            $table->foreign('role_id')->references('id')->on('role');
        });

        Schema::create('right', function (Blueprint $table) {
            $this->standard($table);
            $table->string('ressource');
            $table->string('action');
            $table->integer('role_id')->unsigned();

            $table->foreign('role_id')->references('id')->on('role');
        });


        $this->insert('company', [
            'name' => 'Self',
        ]);

        $this->insert('role', [
            'name' => 'Admin',
        ]);

        $this->insert('user', [
            'name' => 'SuperAdmin',
            'email' => 'admin@admin.admin',
            'username' => 'SuperAdmin',
            'password' => 'Admin',
            'role_id' => 1,
        ]);

        DB::table('right')->insert([
            'company_id' => 1,
            'state' => 'New',
            'created_by' => 1,
            'updated_by' => 1,
            'created_at' => new \DateTime(),
            'updated_at' => new \DateTime(),
            'ressource' => '.*',
            'action' => 'CRUD',
            'role_id' => 1,
        ]);

        Schema::table('company', function (Blueprint $table) {
            $table->foreign('company_id')->references('id')->on('company');
            $table->foreign('created_by')->references('id')->on('user');
            $table->foreign('updated_by')->references('id')->on('user');
        });

        Schema::table('role', function (Blueprint $table) {
            $table->foreign('company_id')->references('id')->on('company');
            $table->foreign('created_by')->references('id')->on('user');
            $table->foreign('updated_by')->references('id')->on('user');
        });
    }
}
