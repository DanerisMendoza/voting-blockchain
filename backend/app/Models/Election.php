<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Election extends Model
{
    use HasFactory;

    protected $fillable = [
        'isActive'
    ];

    public function getActiveElection()
    {
        $result = $this->where('isActive', true)->first();
        return $result;
    }
}
