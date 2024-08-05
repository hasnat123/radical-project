<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = ['id', 'title', 'author', 'rating', 'price'];

    public function scopeFilter($query, $title)
    {
        if($title ?? false)
        {
            $query->where('title', 'like', '%' . $title . '%')
            ->orWhere('author', 'like', '%' . $title . '%');
        }
    }

    public $incrementing = false;

    use HasFactory;
}
