<!Doctype html>

<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="{{asset('css/app.css')}}" rel="stylesheet">
</head>

<body>

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

    <div class="outer">
        <div class="middle">
            <div id="react-app" class="inner">
            </div>
        </div>
    </div>

</body>
<script src="{{asset('js/app.js')}}"></script>

</html>