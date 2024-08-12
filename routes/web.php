<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TeamController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Team;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'teams' => Team::all(),
    ]);
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [TeamController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/admin/team/create', [TeamController::class, 'create'])->name('team.create');
    Route::post('/admin/team/store', [TeamController::class, 'store'])->name('team.store');
    Route::post('/admin/team/update', [TeamController::class, 'update'])->name('team.update');
    Route::get('/admin/events', [EventController::class, 'index'])->name('event');
    Route::post('/admin/events/store', [EventController::class, 'store'])->name('event.store');
});

require __DIR__.'/auth.php';
