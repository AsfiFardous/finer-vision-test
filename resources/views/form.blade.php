<!Doctype html>

<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="{{asset('css/app.css')}}" rel="stylesheet">
</head>

<body>
    @if(count($errors) > 0)
    @foreach($errors->all() as $error )
    <div class="alert alert-danger">
        {{$error}}
    </div>
    @endforeach
    @endif

    @if(session('success'))
    <div class="alert alert-success">
        {{session('success')}}
    </div>
    @endif

    @if(session('error'))
    <div class="alert alert-danger">
        {{session('error')}}
    </div>
    @endif


    <form action="save-data" method="POST">
        {{ csrf_field() }}
        <div>
            <legend class="form-legend">Step 1</legend>
        </div>
        <div>
            <div style="display: inline-block">
                <label for="name">First Name</label><br />
                <input type="text" name="first_name" id="name" required />

            </div>

            <div style="display: inline-block">
                <label for="name">Surname</label><br />
                <input type="text" name="surname" id="name" required />
                </label>
            </div>
        </div>
        <div>
            <label for="email">Email Address</label><br />
            <input type="email" name="email" id="email" required />
        </div>

        <div>
            <legend class="form-legend">More Comments</legend>
        </div>

        <div>
            <div style="display: inline-block">
                <label for="number">Telephone Number</label><br />
                <input type="number" name="telephone" id="number" required />
            </div>

            <div class="select-wrapper" style="display: inline-block">
                <label for="select-choice">Gender</label>
                <div class="styled-select" for="select-choice">
                    <select name="gender" id="select-choice">
                        <option value="Select Gender">Male</option>
                        <option value="Select Gender">Female</option>
                    </select>
                </div>

            </div>
        </div>


        <div>
            <label for="date_of_birth">Date Of Birth</label><br />
            <input type="date" name="date_of_birth" id="date_of_birth" />
        </div>

        <div>
            <legend class="form-legend">Final Comments</legend><br />
        </div>

        <div class="clr">
            <label for="textarea">Comments</label><br />
            <textarea cols="40" rows="8" name="comment" id="textarea"></textarea>
        </div>

        <div>
            <button type="submit" value="Next >">Next </button>
            <div class="clr"></div>
        </div>
        </table>
    </form>


</body>

</html>