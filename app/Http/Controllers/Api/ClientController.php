<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Http\Resources\ClientResource;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // dd(request()->all());
        $name  = request()->name;
        $email = request()->email;
        $clients = Client::when($name, function($query) use ($name){
                    $query->where('name', 'LIKE','%'.$name.'%');
                })
                ->when($email, function($query) use ($email){
                    $query->where('email', 'LIKE','%'.$email.'%');
                })
                ->orderBy('id', 'desc')
                ->paginate(request()->perPage, ['*'], 'page', request()->page);
        
        return ClientResource::collection($clients);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreClientRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreClientRequest $request)
    {
        $client = Client::create($request->validated());
 
        return new ClientResource($client);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function show(Client $client)
    {
        return new ClientResource($client);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateClientRequest  $request
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateClientRequest $request, Client $client)
    {
        $client->update($request->validated());
 
        return new ClientResource($client);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function destroy(Client $client)
    {
        $client->delete();
 
        return response()->noContent();
    }
}
