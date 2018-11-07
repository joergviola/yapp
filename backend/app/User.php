<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use function var_dump;

class User extends Authenticatable
{
    use Notifiable;

    protected $table = 'user';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];


  public function rights()
  {
    return $this->hasMany('App\Right', 'role_id', 'role_id');
  }

  public function check($entity, $operation) {
    foreach ($this->rights as $right) {
      if ($right->allows($entity, $operation)) return true;
    }
    return false;
  }
}
