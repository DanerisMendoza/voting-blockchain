<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        $User = new User();
        $User->username = 'admin';
        $User->password = bcrypt('123');   
        $User->first_name = $faker->firstName;
        $User->middle_name = $faker->lastName;
        $User->last_name = $faker->lastName;
        $User->email = $faker->email;
        $User->gender = $faker->randomElement(['male', 'female']);
        $User->address = $faker->address;
        $User->age = $faker->randomElement([20, 21, 22]);
        $User->save();
        User::factory(9)->create();
    }
}
