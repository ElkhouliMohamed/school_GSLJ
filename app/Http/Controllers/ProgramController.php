<?php

namespace App\Http\Controllers;

use App\Models\Program;
use Inertia\Inertia;

class ProgramController extends Controller
{
    public function index()
    {
        // Redirect to the preschool program page
        $preschoolProgram = Program::where('level', 'preschool')
            ->where('is_active', true)
            ->first();
            
        if ($preschoolProgram) {
            return redirect()->route('programs.show', $preschoolProgram->slug);
        }
        
        // Fallback: show all programs if no preschool program exists
        $programs = Program::where('is_active', true)
            ->orderBy('order')
            ->get();

        return Inertia::render('Programs/Index', [
            'programs' => $programs,
        ]);
    }

    public function show($slug)
    {
        $program = Program::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return Inertia::render('Programs/Show', [
            'program' => $program,
        ]);
    }
}
