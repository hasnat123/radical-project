<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Favourite;

use App\Services\APIService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BestSellersController extends Controller
{
    protected $APIService;

    // Dependency injection for APIService
    public function __construct(APIService $APIService)
    {
        $this->APIService = $APIService;
    }

    // Merge external books with internal favourites
    public function mergeFavourites($books)
    {
        $favouriteBooks = Book::all();

        // Transform external books to internal structure
        $transformedBooks = array_map(function ($book) {
            return [
                'id' => $book['id'],
                'title' => $book['volumeInfo']['title'],
                'author' => $book['volumeInfo']['authors'][0] ?? null,
                'rating' => null,
                'price' => null,
                'favourited' => false
            ];
        }, $books['items']);

        // Convert $transformedBooks to a collection
        $transformedBooksCollection = collect($transformedBooks);

        // Filter $favouriteBooks to only include those that exist in $transformedBooks
        $filteredFavouriteBooks = collect($favouriteBooks)->filter(function ($book) use ($transformedBooksCollection) {
            return $transformedBooksCollection->contains('id', $book->id);
        });

        // Merge the filtered favourite books with transformed books
        $mergedBooks = $filteredFavouriteBooks
            ->concat($transformedBooksCollection)
            ->unique('id')
            ->values();

        return $mergedBooks;
    }

    // Return the list of books with favourites merged
    public function index()
    {
        $books = $this->APIService->getList();

        return response()->json($this->mergeFavourites($books));
    }

    // Search for books and merge with favourites
    public function search(Request $request)
    {
        $query = $request->input('query');
        $books = $this->APIService->searchBooks($query);

        return response()->json($this->mergeFavourites($books));
    }
}
