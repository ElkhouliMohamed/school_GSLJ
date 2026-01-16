<!DOCTYPE html>
<html>

<head>
    <title>Nouveau message de contact</title>
</head>

<body>
    <h1>Nouveau message depuis le site web</h1>
    <p><strong>Nom:</strong> {{ $data['firstName'] }} {{ $data['lastName'] }}</p>
    <p><strong>Email:</strong> {{ $data['email'] }}</p>
    <p><strong>Téléphone:</strong> {{ $data['phoneNumber'] }}</p>
    <p><strong>Message:</strong></p>
    <p>{{ $data['message'] }}</p>
</body>

</html>