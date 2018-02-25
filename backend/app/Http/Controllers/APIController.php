<?php

namespace App\Http\Controllers;

use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Input;


class APIController extends Controller {

    public function index(Request $request, $entity) {
        $query = $this->db($entity);
	    $q = $request->input('q');
	    if ($q) {
            $q = explode('&', urldecode($q));
            foreach ($q as $where) {
                list($field, $value) = explode('=', $where);
                $query->where($field, 'like', '%'.$value.'%');
            }
        }
		$result = $query->get()->toArray();
        $with = $request->input('with');
	    $this->with($result, $with);
	    return $result;
    }

    public function get(Request $request, $entity, $id) {
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

    public function create(Request $request, $entity) {
	    $data = $this->data($request);
	    try {
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

    public function update(Request $request, $entity) {
	    $data = $this->data($request);
	    $id = $data['id'];
	    $this->db($entity)
	      ->where('id', $id)
	      ->update($data);

	    return $this->get($request, $entity, $id);
    }

    public function delete($entity, $id) {
	    $result = $this->db($entity)
	                   ->where("id", $id)
	                   ->delete();
	    if ($result==0) {
		    abort(404);
	    }
	    return response()->json($result);
    }

    private function data($request) {
	    $data = $request->json()->all();
	    if (isset($data['password'])) {
	    	\Log::info($data['password']);
		    $data['password'] = Hash::make($data['password']);
		    \Log::info($data['password']);
	    }
	    return $data;
    }

    private function db($entity) {
        return DB::table($entity);
    }

    private function with($result, $with) {
	    $with = array_filter(explode(',', $with));
		foreach ($with as $foreign) {
		    list($column, $type) = explode(':', $foreign);
			$ids = $this->distinct($result, $column);
			$references = $this->query($type, $ids);
			foreach ($result as $r) {
				$r->$column = $references[$r->$column];
			}
		}
    }

	private function distinct($result, $column) {
		return array_unique(array_map(function($elem) use ($column) {return $elem->$column;}, $result));
	}

	private function query($entity, $ids) {
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