<?php

namespace App\Http\Controllers;

use App\Models\TacGia;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    /**
     * Display a listing of the authors.
     */
    public function index(Request $request)
    {
        $authors = TacGia::orderBy('ten')->paginate(20);
        
        if ($request->expectsJson()) return response()->json($authors);
        return view('employee.authors.index', compact('authors'));
    }

    /**
     * Display the specified author.
     */
    public function show(Request $request, int $id)
    {
        $author = TacGia::with(['sach.sanpham'])->findOrFail($id);
        
        if ($request->expectsJson()) return response()->json($author);
        return view('authors.show', compact('author'));
    }

    /**
     * Store a new author.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ho'     => ['required', 'string', 'max:50'],
            'tendem' => ['nullable', 'string', 'max:50'],
            'ten'    => ['required', 'string', 'max:50'],
            'diachi' => ['nullable', 'string', 'max:500'],
            'sdt'    => ['nullable', 'string', 'max:20'],
            'email'  => ['nullable', 'email', 'max:100'],
        ]);

        $author = TacGia::create($validated);

        if ($request->expectsJson()) {
            return response()->json(['message' => 'Thêm tác giả thành công!', 'author' => $author], 201);
        }
        return back()->with('success', 'Thêm tác giả thành công!');
    }

    /**
     * Update an existing author.
     */
    public function update(Request $request, int $id)
    {
        $author = TacGia::findOrFail($id);

        $validated = $request->validate([
            'ho'     => ['required', 'string', 'max:50'],
            'tendem' => ['nullable', 'string', 'max:50'],
            'ten'    => ['required', 'string', 'max:50'],
            'diachi' => ['nullable', 'string', 'max:500'],
            'sdt'    => ['nullable', 'string', 'max:20'],
            'email'  => ['nullable', 'email', 'max:100'],
        ]);

        $author->update($validated);

        if ($request->expectsJson()) {
            return response()->json(['message' => 'Cập nhật tác giả thành công!', 'author' => $author]);
        }
        return back()->with('success', 'Cập nhật tác giả thành công!');
    }

    /**
     * Delete an author.
     */
    public function destroy(Request $request, int $id)
    {
        $author = TacGia::findOrFail($id);
        $author->delete();

        if ($request->expectsJson()) {
            return response()->json(['message' => 'Xóa tác giả thành công!']);
        }
        return back()->with('success', 'Xóa tác giả thành công!');
    }
}
