<?php

namespace Tests\Feature;

use App\Models\Gallery;
use App\Models\GalleryAlbum;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class GalleryAlbumTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Setup admin user
        $role = Role::firstOrCreate(['name' => 'admin']);
        $this->user = User::factory()->create();
        $this->user->assignRole($role);
    }

    public function test_admin_can_create_album()
    {
        Storage::fake('public');

        $cover = UploadedFile::fake()->image('cover.jpg');

        $response = $this->actingAs($this->user)->post(route('admin.albums.store'), [
            'title' => ['en' => 'Test Album', 'fr' => 'Album Test'],
            'description' => ['en' => 'Description'],
            'cover_image' => $cover,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('gallery_albums', [
            'slug' => 'test-album',
        ]);
    }

    public function test_admin_can_add_images_to_album()
    {
        Storage::fake('public');
        $album = GalleryAlbum::create(['title' => ['en' => 'Test Album'], 'slug' => 'test-album']);

        $file = UploadedFile::fake()->image('photo.jpg');

        $response = $this->actingAs($this->user)->post(route('admin.galleries.store'), [
            'type' => 'photo',
            'files' => [$file],
            'gallery_album_id' => $album->id,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('galleries', [
            'gallery_album_id' => $album->id,
            'type' => 'photo',
        ]);

        $this->assertEquals(1, $album->galleries()->count());
    }

    public function test_public_can_see_albums()
    {
        GalleryAlbum::create(['title' => ['en' => 'Public Album'], 'slug' => 'public-album']);

        $response = $this->get(route('gallery.index'));

        $response->assertStatus(200);
        $response->assertSee('Public Album');
    }

    public function test_public_can_see_album_details()
    {
        $album = GalleryAlbum::create(['title' => ['en' => 'Detail Album'], 'slug' => 'detail-album']);
        Gallery::create([
            'gallery_album_id' => $album->id,
            'type' => 'photo',
            'path' => '/storage/test.jpg'
        ]);

        $response = $this->get(route('gallery.show', $album->slug));

        $response->assertStatus(200);
        $response->assertSee('Detail Album');
        // Inertia prop check would be ideal, but string check for title works as basic verification
    }
}
