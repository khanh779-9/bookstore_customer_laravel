<?php

namespace App\Http\Controllers;

use App\Http\Resources\TacGiaResource;
use App\Models\TacGia;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    /**
     * Lấy danh sách tác giả.
     */
    public function index(Request $request)
    {
        $authors = TacGia::orderBy('ten')->paginate(20);
        if ($request->expectsJson()) {
            return TacGiaResource::collection($authors);
        }
        return view('employee.authors.index', compact('authors'));
    }

    /**
     * Lấy thông tin chi tiết tác giả.
     */
    public function show(Request $request, int $id)
    {
        $author = TacGia::with(['sach.sanpham'])->findOrFail($id);
        if ($request->expectsJson()) {
            return new TacGiaResource($author);
        }
        return view('authors.show', compact('author'));
    }

    /**
     * Thêm mới tác giả.
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
            return (new TacGiaResource($author))->additional(['message' => 'Thêm tác giả thành công!']);
        }
        return back()->with('success', 'Thêm tác giả thành công!');
    }

    /**
     * Cập nhật thông tin tác giả.
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
            return (new TacGiaResource($author))->additional(['message' => 'Cập nhật tác giả thành công!']);
        }
        return back()->with('success', 'Cập nhật tác giả thành công!');
    }

    /**
     * Xóa tác giả.
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
