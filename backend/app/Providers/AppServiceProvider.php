<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // https://laravel-news.com/laravel-5-4-key-too-long-error
        Schema::defaultStringLength(191);

//	    DB::listen(function ($query) {
//		    \Log::debug('query', ['sql'=>$query->sql, 'bindings'=>$query->bindings, 'time'=>$query->time]);
//	    });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
