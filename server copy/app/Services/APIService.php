<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class APIService
{
    protected $apiKey;

    public function __construct()
    {
        $this->apiKey = env('GOOGLE_BOOKS_API_KEY');
    }

    public function getList()
    {
        $response = Http::get('https://www.googleapis.com/books/v1/volumes', [
            'api-key' => $this->apiKey,
            'q' => '*',
            // 'orderBy' => 'newest',
            'maxResults' => 20,
        ]);

        if ($response->successful()) {
            return $response->json();
        }

        return null;
    }

    public function searchBooks($query)
    {
        $response = Http::get('https://www.googleapis.com/books/v1/volumes', [
            'api-key' => $this->apiKey,
            'q' => $query
        ]);

        if ($response->successful()) {
            return $response->json();
        }

        return null;
    }

    public function getBook($bookId)
    {
        $response = Http::get("https://www.googleapis.com/books/v1/volumes/{$bookId}", [
            'api-key' => $this->apiKey
        ]);

        // if ($response->successful() && isset($response['results'][0])) {
        //     return $response['results'][0];
        // }

        if ($response->successful()) {
            return $response->json();
        }

        return null;
    }
}