<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::all();
        return Inertia::render('Event/Event', [
            'events' => $events
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Event/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'dated' => 'required',
            'images' => 'required',
            'video_link' => 'required',
        ]);

        // dd($request->all());

        $path = null;

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('images', 'public');
                $imagePaths[] = $path;
            }
        }

        if ($request->hasFile('images')) {
            $image = $request->file('images');
            $path = $image->store('images', 'public');
        }

        $requestData = $request->except('images');
        $requestData['images'] = '/storage/' . $path;

        $requestData = $request->all();
        $requestData['images'] = json_encode($imagePaths);

        Event::create($requestData);

        dd($requestData, "Event record created successfully.");

    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'dated' => 'required',
            'images' => 'required',
            'video_link' => 'required',
        ]);

        $path = null;

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('images', 'public');
                $imagePaths[] = $path;
            }
        }

        if ($request->hasFile('images')) {
            $image = $request->file('images');
            $path = $image->store('images', 'public');
        } else {
            $path = DB::table('teams')->where('id', $request->id)->first()->images;
        }

        $requestData = $request->except('images');
        $requestData['images'] = '/storage/' . $path;

        $requestData = $request->all();
        $requestData['images'] = json_encode($imagePaths);

        

        $requestData = $request->only('name', 'email', 'position', 'club');
        if ($request->hasFile('img')) {
            $requestData['img'] = '/storage/' . $path;
        } else {
            $requestData['img'] = DB::table('teams')->where('id', $request->id)->first()->img;
        }


        Event::where('id', $request->id)->update($requestData);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        //
    }
}
