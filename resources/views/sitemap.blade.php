{!! '<' . '?xml version="1.0" encoding="UTF-8"?' . '>' !!}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    @foreach ($staticPages as $page)
        <url>
            <loc>{{ url($page) }}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
        </url>
    @endforeach

    @foreach ($posts as $post)
        <url>
            <loc>{{ route('news.show', $post->slug) }}</loc>
            <lastmod>{{ $post->updated_at->tz('UTC')->toAtomString() }}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.6</priority>
        </url>
    @endforeach

    @foreach ($programs as $program)
        <url>
            <loc>{{ route('programs.show', $program->slug) }}</loc>
            <lastmod>{{ $program->updated_at->tz('UTC')->toAtomString() }}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.7</priority>
        </url>
    @endforeach

    @foreach ($facilities as $facility)
        <url>
            <loc>{{ route('facilities.show', $facility->slug) }}</loc>
            <lastmod>{{ $facility->updated_at->tz('UTC')->toAtomString() }}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.7</priority>
        </url>
    @endforeach

    @foreach ($teamMembers as $teamMember)
        <url>
            <loc>{{ route('team.show', $teamMember->slug) }}</loc>
            <lastmod>{{ $teamMember->updated_at->tz('UTC')->toAtomString() }}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.6</priority>
        </url>
    @endforeach
</urlset>