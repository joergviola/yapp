<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use function preg_match;

class Right extends Model
{
  protected $table = 'right';

  public function allows($entity, $operation) {
    if (preg_match('/'.$this->ressource.'/', $entity)) {
      \Log::debug("$this->ressource $this->action: ".strpos($this->action, $operation));
      if (strpos($this->action, $operation)!==FALSE) return true;
      \Log::debug("was false");
    }
    return false;
  }
}
