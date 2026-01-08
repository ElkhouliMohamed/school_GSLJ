<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public function index(Request $request)
    {
        $type = $request->query('type', 'all');

        $query = Gallery::latest();

        if ($type !== 'all') {
            $query->where('type', $type);
        }

        $galleries = $query->paginate(12)->withQueryString();

        return Inertia::render('Gallery/Index', [
            'galleries' => $galleries,
            'currentType' => $type,
        ]);
    }
}
