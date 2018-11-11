<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Base extends Migration
{

    protected function standard($table, $foreign=true) {
        $table->increments('id');
        $table->integer('organisation_id')->unsigned();
        $table->string('state');
        $table->timestamps();
        $table->integer('created_by')->unsigned();
        $table->integer('updated_by')->unsigned();

        if ($foreign) {
            $table->foreign('organisation_id')->references('id')->on('organisation');
            $table->foreign('created_by')->references('id')->on('user');
            $table->foreign('updated_by')->references('id')->on('user');
        }
    }

    public function up()
    {
        $this->systemUp();

        Schema::create('project', function (Blueprint $table) {
            $this->standard($table);
            $table->string('name');
            $table->text('description')->nullable();
            $table->date('starts_at')->nullable();
            $table->date('ends_at')->nullable();
            $table->integer('client_id')->unsigned();
            $table->integer('planned')->unsigned()->nullable();
            $table->integer('used')->unsigned()->nullable();
            $table->boolean('template')->default(false);

            $table->foreign('client_id')->references('id')->on('organisation');
        });

        Schema::create('task', function (Blueprint $table) {
            $this->standard($table);
            $table->string('name');
            $table->text('description')->nullable();
            $table->date('starts_at')->nullable();
            $table->date('due_at')->nullable();
            $table->date('finished_at')->nullable()->nullable();
            $table->integer('project_id')->unsigned()->nullable();
            $table->integer('user_id')->unsigned()->nullable();
            $table->integer('parent_id')->unsigned()->nullable();
            $table->integer('pos_project')->unsigned()->nullable();
            $table->integer('pos_user')->unsigned()->nullable();
            $table->integer('position')->unsigned()->nullable();
            $table->integer('planned')->unsigned()->nullable();
            $table->integer('used')->unsigned()->nullable();

            $table->foreign('project_id')->references('id')->on('project');
            $table->foreign('user_id')->references('id')->on('user');
            $table->foreign('parent_id')->references('id')->on('task');
        });

        Schema::create('action', function (Blueprint $table) {
            $this->standard($table);
            $table->text('comment')->nullable();
            $table->dateTime('from')->nullable();
            $table->dateTime('to')->nullable();
            $table->integer('project_id')->unsigned();
            $table->integer('task_id')->unsigned()->nullable();

            $table->foreign('project_id')->references('id')->on('project');
            $table->foreign('task_id')->references('id')->on('task');
        });

        Schema::create('document', function (Blueprint $table) {
            $this->standard($table);
            $table->text('name')->nullable();
            $table->integer('project_id')->unsigned();
            $table->integer('task_id')->unsigned()->nullable();

            $table->foreign('project_id')->references('id')->on('project');
            $table->foreign('task_id')->references('id')->on('task');
        });


        Schema::create('allocation', function (Blueprint $table) {
          $this->standard($table);
          $table->text('comment')->nullable();
          $table->dateTime('from')->nullable();
          $table->dateTime('to')->nullable();
          $table->integer('percent')->unsigned()->nullable();
          $table->integer('project_id')->unsigned()->nullable();
          $table->integer('user_id')->unsigned();

          $table->foreign('project_id')->references('id')->on('project');
          $table->foreign('user_id')->references('id')->on('user');
        });

        $this->seed();
    }

    public function down()
    {
        Schema::dropIfExists('allocation');
        Schema::dropIfExists('action');
        Schema::dropIfExists('document');
        Schema::dropIfExists('task');
        Schema::dropIfExists('project');

        $this->systemDown();
    }

    private function insert($table, $row) {
        DB::table($table)->insert(array_merge([
            'organisation_id' => 1,
            'state' => 'New',
            'created_by' => 1,
            'updated_by' => 1,
            'created_at' => new \DateTime(),
            'updated_at' => new \DateTime()
        ], $row));
    }

    private function systemUp()
    {
        Schema::create('role', function (Blueprint $table) {
            $this->standard($table, false);
            $table->string('name');
        });

        Schema::create('organisation', function (Blueprint $table) {
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
            $table->string('avatar')->nullable();
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


        $this->insert('organisation', [
            'name' => 'Self',
        ]);

        $this->insert('role', [
            'name' => 'Admin',
        ]);

        $this->insert('user', [
          'name' => 'SuperAdmin',
          'email' => 'admin@admin.admin',
          'username' => 'SuperAdmin',
          'password' => Hash::make('Admin'),
          'role_id' => 1,
        ]);

        $this->insert('user', [
          'name' => 'User1',
          'email' => 'user1@admin.admin',
          'username' => 'user1',
          'password' => Hash::make('blabla'),
          'role_id' => 1,
        ]);

        $this->insert('user', [
          'name' => 'User2',
          'email' => 'user2@admin.admin',
          'username' => 'user2',
          'password' => Hash::make('blabla'),
          'role_id' => 1,
        ]);

        DB::table('right')->insert([
            'organisation_id' => 1,
            'state' => 'New',
            'created_by' => 1,
            'updated_by' => 1,
            'created_at' => new \DateTime(),
            'updated_at' => new \DateTime(),
            'ressource' => '.*',
            'action' => 'CRUD',
            'role_id' => 1,
        ]);

        Schema::table('organisation', function (Blueprint $table) {
            $table->foreign('organisation_id')->references('id')->on('organisation');
            $table->foreign('created_by')->references('id')->on('user');
            $table->foreign('updated_by')->references('id')->on('user');
        });

        Schema::table('role', function (Blueprint $table) {
            $table->foreign('organisation_id')->references('id')->on('organisation');
            $table->foreign('created_by')->references('id')->on('user');
            $table->foreign('updated_by')->references('id')->on('user');
        });
    }

    private function seed()
    {
        $this->insert('organisation', [
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

    private function systemDown()
    {
        Schema::table('organisation', function (Blueprint $table) {
            $table->dropForeign(['organisation_id']);
            $table->dropForeign(['created_by']);
            $table->dropForeign(['updated_by']);
        });

        Schema::table('user', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->dropForeign(['organisation_id']);
            $table->dropForeign(['created_by']);
            $table->dropForeign(['updated_by']);
        });

        Schema::dropIfExists('right');
        Schema::dropIfExists('role');
        Schema::dropIfExists('user');
        Schema::dropIfExists('organisation');
    }
}
