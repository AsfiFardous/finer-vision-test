<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Users;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    private function create_date_of_birth(Request $request)
    {
        $dd = $request->input('date');
        $mm = $request->input('month');
        $yy = $request->input('year');
        return $yy . '-' . $mm . '-' . $dd;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'first_name' => 'required',
            'surname' => 'required',
            'email' => 'required',
            'telephone' => 'required',
            'gender' => 'required',
            'date' => 'required',
            'month' => 'required',
            'year' => 'required',
        ]);
        $users = new users;
        $users->first_name = $request->input('first_name');
        $users->surname = $request->input('surname');
        $users->email = $request->input('email');
        $users->telephone = $request->input('telephone');
        $users->gender = $request->input('gender');
        $users->date_of_birth = $this->create_date_of_birth($request);
        $users->comment = $request->input('comment');
        $users->save();

        return redirect('/form')->with('success', 'Data submitted');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
