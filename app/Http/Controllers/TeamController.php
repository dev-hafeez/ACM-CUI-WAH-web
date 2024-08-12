<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $teams = Team::all();
        return Inertia::render('Dashboard', [
            'teams' => $teams
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Team/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|string|lowercase|email|max:255|unique:' . Team::class,
            'position' => 'required',
            'club' => 'required',
            'img' => 'required|image',
        ]);

        $path = null;

        if ($request->hasFile('img')) {
            $image = $request->file('img');
            $path = $image->store('images', 'public');
        }

        $requestData = $request->except('img');
        $requestData['img'] = '/storage/' . $path;

        Team::create($requestData);

        return response()->json(['success' => 'Team record created successfully.']);
    }



    /**
     * Display the specified resource.
     */
    public function show(Team $team)
    {
        return Inertia::render('Teams/Show', [
            'team' => $team
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Team $team)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Team $team)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|string|lowercase|email|max:255',
            'position' => 'required',
            'club' => 'required',
        ]);

        $path = null;

        if ($request->hasFile('img')) {
            $image = $request->file('img');
            $path = $image->store('images', 'public');
        } else {
            $path = DB::table('teams')->where('id', $request->id)->first()->img;
        }

        $requestData = $request->only('name', 'email', 'position', 'club');
        if ($request->hasFile('img')) {
            $requestData['img'] = '/storage/' . $path;
        } else {
            $requestData['img'] = DB::table('teams')->where('id', $request->id)->first()->img;
        }


        Team::where('id', $request->id)->update($requestData);

        return redirect()->back()->with('success', 'Team record updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Team $team)
    {
        //
    }
}
