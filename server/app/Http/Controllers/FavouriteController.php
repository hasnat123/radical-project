<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Favourite;
use App\Services\APIService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redis;

class FavouriteController extends Controller
{
    protected $APIService;

    public function __construct(APIService $APIService)
    {
        $this->APIService = $APIService;
    }

    public function index(Request $request)
    {
        $query = $request->input('query');
        // $favoriteBooks = Book::latest()->filter($query)->paginate(20);
        $favoriteBooks = Book::latest()->filter($query)->get();

        return response()->json($favoriteBooks);
    }

    public function show(Book $book)
    {
        return response()->json($book);
    }

    public function update(Request $request, Book $book)
    {

        $formFields = $request->validate([
            'price' => 'numeric|between:0,99.99',
            'rating' => 'integer|min:1|max:5'
        ]);

        $book->update($formFields);

        return response()->json(['message' => 'Book updated successfully.']);
    }

    public function destroy(Book $book)
    {
        $book->delete();

        return response()->json(['message' => 'Book deleted successfully.']);
    }

    public function toggleFavourite(Request $request)
    {   

        // Check if the book exists in the books table
        $book = Book::find($request->id);

        // If the book doesn't exist, add it to the books table
        if (!$book) {

            $request->validate([
                'id' => 'required|string|unique:books,id',
                'title' => 'required|string',
                'author' => 'nullable|string'
            ]);

            $book = Book::create([
                'id' => $request->id,
                'title' => $request->title,
                'author' => $request->author
            ]);

            return response()->json(['message' => 'Book added to favorites']);
        }

        else
        {
            $book->delete();
            return response()->json(['message' => 'Book removed from favorites']);
        }
    }
}
