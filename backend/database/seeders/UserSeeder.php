<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        $User = new User();
        $User->username = 'admin';
        $User->password = Hash::make('123');
        $User->first_name = $faker->firstName;
        $User->middle_name = $faker->lastName;
        $User->last_name = $faker->lastName;
        $User->suffix = $faker->suffix;
        $User->user_role = 1; // 1 is admin 2 is endusers
        $User->email = $faker->email;
        $User->gender = $faker->randomElement(['male', 'female']);
        $User->profile_pic_path = '/ProfilePic/avatar'.$faker->randomElement(['1', '2','3','4']).'.PNG';
        $User->address = $faker->address;
        $User->age = $faker->randomElement([20, 21, 22]);
        $User->save();
        User::factory(9)->create();
    }
}
