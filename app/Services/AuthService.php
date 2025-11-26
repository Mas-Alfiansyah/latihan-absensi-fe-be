<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    /**
     * Register User
     */
    public function register(array $data)
    {
        return User::create([
            'name'  => $data['name'],
            'email' => $data['email'],
            'role'  => $data['role'], // admin atau teacher
            'password' => Hash::make($data['password']),
        ]);
    }

    /**
     * Login User dan generate token
     */
    public function login(array $data)
    {
        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return null;
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'token' => $token,
            'user'  => $user
        ];
    }
}
