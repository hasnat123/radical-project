<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    // Mass assignable attributes
    protected $fillable = ['id', 'title', 'author', 'rating', 'price'];

    // Scope to filter books by title or author
    public function scopeFilter($query, $title)
    {
        if($title ?? false)
        {
            $query->where('title', 'like', '%' . $title . '%')
            ->orWhere('author', 'like', '%' . $title . '%');
        }
    }

    // Disable auto-incrementing IDs
    public $incrementing = false;

    use HasFactory;
}
