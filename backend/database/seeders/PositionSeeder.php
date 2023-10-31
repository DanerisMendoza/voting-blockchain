<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Position;
class PositionSeeder extends Seeder
{
    public function run(): void
    {
        $Position = new Position();
        $Position->name = 'president';
        $Position->save();
        
        $Position = new Position();
        $Position->name = 'vice president';
        $Position->save();

        $Position = new Position();
        $Position->name = 'secretary';
        $Position->save();
    }
}
