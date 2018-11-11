<?php

namespace App\Http\Controllers;

use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Input;
use Illuminate\Support\Facades\Auth;


class APIController extends Controller
{

  public function user()
  {
    $user = Auth::user();
    $user->rights = $user->rights;
    return response()->json($user);
  }

  public function login(Request $request)
  {
    if (Auth::attempt(['username' => $request->json('username'), 'password' => $request->json('password')])) {
      $user = Auth::user();
      $user->rights = $user->rights;
      return response()->json($user);
    } else {
      abort(401);
    }
  }

  public function logout(Request $request)
  {
    Auth::logout();
    return response()->json([]);
  }

  private function check($entity, $operation) {
    if (!Auth::user()->check($entity, $operation)) abort(401);;
  }

  public function index(Request $request, $entity)
  {
    $this->check($entity, 'R');
    $query = $this->db($entity);
    $q = $request->input('q');
    if ($q) {
      $q = explode('&', urldecode($q));
      foreach ($q as $where) {
        if (!preg_match('/([a-z_]+)(=|~|!=)(.*)/', $where, $matches, PREG_OFFSET_CAPTURE)) continue;
        $field = $matches[1][0];
        $operator = $matches[2][0];
        $value = $matches[3][0];
        switch ($operator) {
          case '=':
            $query->where($field, '=', $value);
            break;
          case '~':
            $query->where($field, 'like', '%' . $value . '%');
            break;
          case '!=':
            $query->where($field, '<>', $value);
            break;

        }
      }
    }
    $orderby = $request->input('orderBy');
    if ($orderby) {
      list($field, $order) = explode(':', $orderby);
      $query->orderBy($field, $order);
    }
    $result = $query->get()->toArray();
    $with = $request->input('with');
    $this->with($result, $with);

    return $result;
  }

  public function get(Request $request, $entity, $id)
  {
    $this->check($entity, 'R');
    try {
      $with = $request->input('with');
      $result = $this->db($entity)
        ->where("id", $id)
        ->first();
      if (!$result) {
        abort(404);
      }
      $this->with([$result], $with);
      return response()->json($result);
    } catch (Exception $e) {
      $msg = [
        'message' => $e->getMessage()
      ];
      return response()->json($msg, 500);
    }
  }

  public function create(Request $request, $entity)
  {
    $this->check($entity, 'C');
    $data = $this->data($request);
    try {
      $user = Auth::user();
      $data = array_merge([
        'organisation_id' => $user->organisation_id,
        'state' => 'New',
        'created_by' => $user->id,
        'updated_by' => $user->id,
        'created_at' => new \DateTime(),
        'updated_at' => new \DateTime()
      ], $data);
      $id = $this->db($entity)
        ->insertGetId($data);
      return $this->get($request, $entity, $id);
    } catch (QueryException $e) {
      $msg = [
        'message' => $e->getMessage()
      ];
      return response()->json($msg, 500);
    }
  }

  public function update(Request $request, $entity)
  {
    $this->check($entity, 'U');
    $data = $this->data($request);
    $id = $data['id'];
    $this->db($entity)
      ->where('id', $id)
      ->update($data);

    return $this->get($request, $entity, $id);
  }

  public function delete($entity, $id)
  {
    $this->check($entity, 'D');
    try {
      $result = $this->db($entity)
        ->where("id", $id)
        ->delete();
      if ($result == 0) {
        abort(404);
      }
      return response()->json($result);
    } catch (QueryException $qe) {
      return response()->json($qe->getMessage(), 403);
    }
  }

  private function data($request)
  {
    $data = $request->json()->all();
    if (isset($data['password'])) {
      \Log::info($data['password']);
      $data['password'] = Hash::make($data['password']);
      \Log::info($data['password']);
    }
    return $data;
  }

  private function db($entity)
  {
    return DB::table($entity);
  }

  private function with($result, $with)
  {
    $with = array_filter(explode(',', $with));
    foreach ($with as $foreign) {
      list($column, $type) = explode(':', $foreign);
      $ids = $this->distinct($result, $column);
      $references = $this->query($type, $ids);
      foreach ($result as $r) {
        if ($r->$column) {
          $r->$column = $references[$r->$column];
        }
      }
    }
  }

  private function distinct($result, $column)
  {
    return array_unique(array_map(function ($elem) use ($column) {
      return $elem->$column;
    }, $result));
  }

  private function query($entity, $ids)
  {
    // currently allowed...
    // $this->check($entity, 'R');
    $rows = $this->db($entity)
      ->whereIn("id", $ids)
      ->get();
    $result = [];
    foreach ($rows as $r) {
      $result[$r->id] = $r;
    }
    return $result;
  }
}